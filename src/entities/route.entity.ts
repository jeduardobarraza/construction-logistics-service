import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocationDto } from 'src/dto/location.dto';

@Schema({ timestamps: true })
export class Route extends Document {
  @Prop({ required: true, unique: true, index: true })
  routeId: string;

  @Prop({ required: true})
  routeNumber: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true})
  routeDate: Date;

  @Prop({ required: true })
  detail: LocationDto[];

}

export const RouteSchema = SchemaFactory.createForClass(Route);
