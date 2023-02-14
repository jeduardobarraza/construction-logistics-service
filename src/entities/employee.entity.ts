import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { contactInformationDto } from 'src/dto/contactInformation.dto';
import { Salary } from './salary.entity';
//import { SaleUnitLocationDto } from 'src/dto/saleUnitLocation.dto';

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true, unique: true })
  employeeId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  secondLastName: string;

  @Prop({ required: true })
  dniType: string;

  @Prop({ required: true })
  dni: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  initialDate: Date;

  @Prop({ required: false })
  finalDate: Date;

  @Prop({ required: true })
  contactInformation: contactInformationDto;

  @Prop({ required: true})
  salary: Salary;

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
