import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PiecesOrderDto } from 'src/dto/piecesOrder.dto';


@Schema({ timestamps: true })
export class SaleUnitOrder extends Document {
  @Prop({ required: true, unique: true, index: true })
  SaleUnitOrderId: string;

  @Prop({ required: true })
  saleUnitName: string;

  @Prop({ required: false, default: 1 })
  quantity: number;

  @Prop({ required: true })
  piecesSaleUnits: PiecesOrderDto[];

}

export const SaleUnitOrderSchema = SchemaFactory.createForClass(SaleUnitOrder);
