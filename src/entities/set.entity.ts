import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DimensionDto } from 'src/dto/dimension.dto';
import { Piece } from './piece.entity';

@Schema({ timestamps: true })
export class Set extends Document {
  @Prop({ required: true, unique: true })
  setId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  reference: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  tags: string;

  @Prop({ required: true })
  dimensions: DimensionDto;

  @Prop({ required: false })
  sets:Set[];

  @Prop({required: true})
  pieces: Piece[]

}

export const SetSchema = SchemaFactory.createForClass(Set);
