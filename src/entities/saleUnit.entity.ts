import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DimensionDto } from 'src/dto/dimension.dto';
import { Piece } from './piece.entity';
import { Set } from './set.entity';

@Schema({ timestamps: true })
export class SaleUnit extends Document {
  @Prop({ required: true, unique: true })
  saleUnitId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  reference: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  group: string;

  @Prop({ required: true })
  supplyValue: string;

  @Prop({ required: true })
  installValue: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  dimensions: DimensionDto;

  @Prop({ required: true })
  sets: Set[];

  @Prop({ required: false })
  pieces: Piece[];
}

export const SaleUnitSchema = SchemaFactory.createForClass(SaleUnit);
