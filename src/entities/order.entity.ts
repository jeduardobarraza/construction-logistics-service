import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SaleUnitOrderDto } from 'src/dto/SalesUnitsOrder.dto';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, unique: true, index: true })
  orderId: string;

  @Prop({ required: true})
  orderNumber: string;

  @Prop({ required: true, unique: true, index: true })
  confNumber: string;

  @Prop({ required: true })
  orderDate: Date;

  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  finish: string;

  @Prop({ required: true })
  saleUnits: SaleUnitOrderDto[];

  @Prop({ required: true })
  author: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
