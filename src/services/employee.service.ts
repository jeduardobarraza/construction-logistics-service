import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { EmployeeDto } from 'src/dto/employee.dto';
import { Employee } from 'src/entities/employee.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { generalMessages, employeeMessages } from 'src/utils/friendlyMessage';

import { util } from 'src/utils/util';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<Employee>,
  ) {}

  ping() {
    return '*********Employee Service Works*************';
  }

  async create(employee: EmployeeDto) {
    try {
      const employeeDocument = {
        ...employee,
        employeeId: util.getShortId(),
      };
      return await new this.employeeModel(employeeDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(employeeMessages.duplicate);
      throw new InternalServerErrorException(employeeMessages.saveError);
    }
  }

  async getEmployees(type = '') {
    let filter: FilterQuery<Employee>;
    if (type !== '') filter = { type };
    const employees = await this.employeeModel
      .find(filter)
      .sort({ name: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return employees;
  }

  async getEmployeeById(employeeId: string) {
    const filter: FilterQuery<Employee> = { employeeId };
    const savedEmployee = await this.employeeModel.findOne(filter).exec();
    if (!savedEmployee) throw new NotFoundException(generalMessages.notFoundItem);
    return savedEmployee;
  }

  async update(employeeId: string, employee: EmployeeDto) {
    const savedEmployee = await this.getEmployeeById(employeeId);
    return this.employeeModel.findByIdAndUpdate(savedEmployee._id, employee, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(employeeId: string) {
    const savedEmployee = await this.getEmployeeById(employeeId);
    return this.employeeModel.findByIdAndRemove(savedEmployee._id);
  }
}
