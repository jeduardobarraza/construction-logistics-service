import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Salary extends Document {
  @Prop({ required: true, unique: true, index: true })
  salaryId: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  periodo: Date;

  @Prop({ required: true })
  salary: string;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);
