import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { PieceDto } from 'src/dto/piece.dto';
import { Piece } from 'src/entities/piece.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { generalMessages, pieceMessages } from 'src/utils/friendlyMessage';

import { util } from 'src/utils/util';

@Injectable()
export class PieceService {
  constructor(
    @InjectModel(Piece.name)
    private pieceModel: Model<Piece>,
  ) {}

  ping() {
    return '*********Piece Service Works*************';
  }

  async create(piece: PieceDto) {
    try {
      const pieceDocument = {
        ...piece,
        pieceId: util.getShortId(),
      };
      return await new this.pieceModel(pieceDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(pieceMessages.duplicate);
      throw new InternalServerErrorException(pieceMessages.saveError);
    }
  }

  async getPieces(type = '') {
    let filter: FilterQuery<Piece>;
    if (type !== '') filter = { type };
    const pieces = await this.pieceModel
      .find(filter)
      .sort({ name: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return pieces;
  }

  async getPieceById(pieceId: string) {
    const filter: FilterQuery<Piece> = { pieceId };
    const savedPiece = await this.pieceModel.findOne(filter).exec();
    if (!savedPiece) throw new NotFoundException(generalMessages.notFoundItem);
    return savedPiece;
  }

  async update(pieceId: string, piece: PieceDto) {
    const savedPiece = await this.getPieceById(pieceId);
    return this.pieceModel.findByIdAndUpdate(savedPiece._id, piece, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(pieceId: string) {
    const savedPiece = await this.getPieceById(pieceId);
    return this.pieceModel.findByIdAndRemove(savedPiece._id);
  }
}
