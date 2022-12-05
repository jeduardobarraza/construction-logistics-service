import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DimensionDto } from 'src/dto/dimension.dto';
import { PropertyDto } from 'src/dto/property.dto';

@Schema({ timestamps: true })
export class PieceOrder extends Document {
  @Prop({ required: true, unique: true, index: true })
  PiecesOrderId: string;

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

  @Prop({ required: true })
  comments: string;

}

export const PieceOrderSchema = SchemaFactory.createForClass(PieceOrder);
