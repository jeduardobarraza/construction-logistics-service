import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { SalaryDto } from '../dto/salary.dto';
import { Salary } from 'src/entities/salary.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { generalMessages, salaryMessages } from 'src/utils/friendlyMessage';

import { util } from 'src/utils/util';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel(Salary.name)
    private salaryModel: Model<Salary>,
  ) {}

  ping() {
    return '*********Salary Service Works*************';
  }

  async create(salary: SalaryDto) {
    try {
      const salaryDocument = {
        ...salary,
        salaryId: util.getShortId(),
      };
      return await new this.salaryModel(salaryDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(salaryMessages.duplicate);
      throw new InternalServerErrorException(salaryMessages.saveError);
    }
  }

  async getSalaries(type = '') {
    let filter: FilterQuery<Salary>;
    if (type !== '') filter = { type };
    const salaries = await this.salaryModel
      .find(filter)
      .sort({ name: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return salaries;
  }

  async getSalaryById(salaryId: string) {
    const filter: FilterQuery<Salary> = { salaryId };
    const savedSalary = await this.salaryModel.findOne(filter).exec();
    if (!savedSalary) throw new NotFoundException(generalMessages.notFoundItem);
    return savedSalary;
  }

  async update(salaryId: string, salary: SalaryDto) {
    const savedSalary = await this.getSalaryById(salaryId);
    return this.salaryModel.findByIdAndUpdate(savedSalary._id, salary, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(salaryId: string) {
    const savedSalary = await this.getSalaryById(salaryId);
    return this.salaryModel.findByIdAndRemove(savedSalary._id);
  }
}
