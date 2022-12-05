import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DimensionDto } from 'src/dto/dimension.dto';
import { PropertyDto } from '../dto/property.dto';

@Schema({ timestamps: true })
export class Piece extends Document {
  @Prop({ required: true, unique: true, index: true })
  pieceId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  reference: string;

  @Prop({ required: true })
  dimensions: DimensionDto;

  @Prop({ required: true })
  type: string;

  @Prop({ required: false })
  tags: string;

  @Prop({ required: false })
  properties: PropertyDto[];

  @Prop({ required: false, default: 1 })
  quantity: number;
}

export const PieceSchema = SchemaFactory.createForClass(Piece);
