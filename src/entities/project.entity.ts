import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SaleUnitLocationDto } from 'src/dto/saleUnitLocation.dto';

@Schema({ timestamps: true })
export class Project extends Document {
  @Prop({ required: true, unique: true })
  projectId: string;

  @Prop({ required: true })
  responsibleId: number;

  @Prop({ required: true })
  responsible: string;

  @Prop({ required: true })
  tlClientId: number;

  @Prop({ required: true })
  tlClientName: string;

  @Prop({ required: true })
  tlProjectName: string;

  @Prop({ required: true })
  tlProjectAddress: string;

  @Prop({ required: true })
  tlProjectEmails: string;

  @Prop({ required: true })
  tlConfirmationNumber: string[];

  @Prop({ required: true })
  tlProjectId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: false, default: "DRAFT" })
  status: string;

  @Prop({ required: true})
  articles: string;

  @Prop({ required: true })
  detail: SaleUnitLocationDto[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
