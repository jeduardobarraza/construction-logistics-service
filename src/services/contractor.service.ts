import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { ContractorDto } from 'src/dto/contractor.dto';
import { Contractor } from 'src/entities/contractor.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { generalMessages, contractorMessages } from 'src/utils/friendlyMessage';

import { util } from 'src/utils/util';

@Injectable()
export class ContractorService {
  constructor(
    @InjectModel(Contractor.name)
    private contractorModel: Model<Contractor>,
  ) {}

  ping() {
    return '*********Contractor Service Works*************';
  }

  async create(contractor: ContractorDto) {
    try {
      const contractorDocument = {
        ...contractor,
        contractorId: util.getShortId(),
      };
      return await new this.contractorModel(contractorDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(contractorMessages.duplicate);
      throw new InternalServerErrorException(contractorMessages.saveError);
    }
  }

  async getContractors(type = '') {
    let filter: FilterQuery<Contractor>;
    if (type !== '') filter = { type };
    const contractors = await this.contractorModel
      .find(filter)
      .sort({ name: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return contractors;
  }

  async getContractorById(contractorId: string) {
    const filter: FilterQuery<Contractor> = { contractorId };
    const savedContractor = await this.contractorModel.findOne(filter).exec();
    if (!savedContractor) throw new NotFoundException(generalMessages.notFoundItem);
    return savedContractor;
  }

  async update(contractorId: string, contractor: ContractorDto) {
    const savedContractor = await this.getContractorById(contractorId);
    return this.contractorModel.findByIdAndUpdate(savedContractor._id, contractor, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(contractorId: string) {
    const savedContractor = await this.getContractorById(contractorId);
    return this.contractorModel.findByIdAndRemove(savedContractor._id);
  }
}
