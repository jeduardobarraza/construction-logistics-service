import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { SetDto } from 'src/dto/set.dto';
import { Set } from 'src/entities/set.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { generalMessages, setMessages } from 'src/utils/friendlyMessage';

import { util } from 'src/utils/util';

@Injectable()
export class SetService {

  constructor(
    @InjectModel(Set.name)
    private setModel: Model<Set>,
  ) {}

  ping() {
    return '*********Set Service Works*************';
  }

  async create(set: SetDto) {
    try {
      const setDocument = {
        ...set,
        setId: util.getShortId(),
      };
      return await new this.setModel(setDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(setMessages.duplicate);
      throw new InternalServerErrorException(setMessages.saveError);
    }
  }

  async getSets() {
    const sets = await this.setModel
      .find()
      .sort({ name: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return sets;
  }

  async getSetById(setId: string) {
    const filter: FilterQuery<Set> = { setId };
    const savedSet = await this.setModel.findOne(filter).exec();
    if (!savedSet) throw new NotFoundException(generalMessages.notFoundItem);
    return savedSet;
  }

  async update(setId: string, set: SetDto) {
    const savedSet = await this.getSetById(setId);
    return this.setModel.findByIdAndUpdate(savedSet._id, set, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(setId: string) {
    const savedSet = await this.getSetById(setId);
    return this.setModel.findByIdAndRemove(savedSet._id);
  }

  async getPiecesFromSet(setId:string){
    const savedSet = await this.getSetById(setId);
    const sets=savedSet.sets;
    let pieceList:any[]=savedSet.pieces;
      for(let set of sets){
        let setsUnder=set.sets
        if(setsUnder){
          // let pieces=set.pieces;
          // for (let piece of pieces){
          //   console.log('piece: '+piece);
          //   pieceList.push(piece);
          // }
        }else{
          let pieces=set.pieces;
          for (let piece of pieces){
            pieceList.push(piece);
          }
        }

      }
      console.log(pieceList);
      return pieceList;
    }

}
