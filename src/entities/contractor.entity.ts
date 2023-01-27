import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Contractor extends Document {
  @Prop({ required: true, unique: true, index: true })
  contractorId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dni: string;

  @Prop({ required: true })
  nit: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false})
  team: string[];

  @Prop({ required: true})
  area: string;
}

export const ContractorSchema = SchemaFactory.createForClass(Contractor);
