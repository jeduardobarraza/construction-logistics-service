import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocationDto } from 'src/dto/location.dto';

@Schema({ timestamps: true })
export class ProjectLocation extends Document {
  @Prop({ required: true, unique: true, index: true })
  projectLocationId: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  detail: LocationDto[];
}

export const ProjectLocationSchema = SchemaFactory.createForClass(ProjectLocation);
