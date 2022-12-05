import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: false })
export class Dimension extends Document {
  @Prop({ required: true })
  height: number;
  @Prop({ required: true })
  width: number;
  @Prop({ required: true })
  depth: number;
  @Prop({ required: true })
  area: number;
}

export const DimensionSchema = SchemaFactory.createForClass(Dimension);
