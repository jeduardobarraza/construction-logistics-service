import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { OrderDto } from 'src/dto/order.dto';
import { Order } from 'src/entities/order.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { generalMessages, orderMessages } from 'src/utils/friendlyMessage';

import { util } from 'src/utils/util';
import { IsNotEmpty } from 'class-validator';
import { SaleUnit } from 'src/entities/saleUnit.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
  ) {}

  ping() {
    return '*********Order Service Works*************';
  }

  async create(projId:string, order: OrderDto) {
    try {
      const orderDocument = {
        ...order,
        orderId: util.getShortId(),
        projectId:projId
      };
      return await new this.orderModel(orderDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(orderMessages.duplicate);
      throw new InternalServerErrorException(orderMessages.saveError);
    }
  }

  async getOrders() {
    const orders = await this.orderModel
      .find()
      .sort({ projectId: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return orders;
  }

  async getOrderById(orderId: string) {
    const filter: FilterQuery<Order> = { orderId };
    const savedOrder = await this.orderModel.findOne(filter).exec();
    if (!savedOrder) throw new NotFoundException(generalMessages.notFoundItem);
    return savedOrder;
  }

  async getOrderByProjectId(projectId: string) {
    const filter: FilterQuery<Order> = { projectId };
    const savedOrder = await this.orderModel.find(filter).exec();
    if (!savedOrder) throw new NotFoundException(generalMessages.notFoundItem);
    return savedOrder;
  }

  async update(orderId: string, order: OrderDto) {
    const savedOrder = await this.getOrderById(orderId);
    return this.orderModel.findByIdAndUpdate(savedOrder._id, order, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(orderId: string) {
    const savedOrder = await this.getOrderById(orderId);
    return this.orderModel.findByIdAndRemove(savedOrder._id);
  }

  async getPiecesFromOrder(orderId:string){
    console.log('I am getPiecesFromOrder');
    const savedOrder = await this.getOrderById(orderId);
    const saleUnits=savedOrder.saleUnits;
    let pieceList:any[]=[];
    if(saleUnits){
      for(let saleUnit of saleUnits){
          for(let i=1;i<=saleUnit.quantity;i++){
            pieceList=pieceList.concat(saleUnit.piecesList);
        }
      }
    }
    return await this.groupingByPieceId(pieceList);
  }

  groupingByPieceId = (piecesArray) => {
    let groupedPieces:any[]=[];
    let piecesArrayList:any[]=piecesArray;
    let auxPiecesArray:any[]=piecesArray;
    let cont:number=0;
    let quantity:number=0;
    for(let [index, piecesList] of piecesArrayList.entries()){
      cont=0;
      quantity=0;
      let reference:string =piecesList.reference;
      for(let [jindex, auxPieces] of auxPiecesArray.entries()){
        if(reference===auxPieces.reference){
          cont++;
          quantity+=auxPieces.quantity;
          auxPiecesArray[jindex]={};
        }
      }
      if(cont>1 && quantity>1){
        groupedPieces.push(piecesList);
        groupedPieces[groupedPieces.length-1].quantity=quantity;
      }else if(cont==1 && quantity>=1){
        groupedPieces.push(piecesList);
      }
    }
    return groupedPieces
  }

  async getQuantityOfSaleUnitFromOrders(projectId: string){
    const savedOrder = await this.getOrderByProjectId(projectId);
    const Orders=savedOrder;
    let saleUnitList: any[]=[];
    let list:any;
    for (let order of Orders){
      for(let saleUnit of order.saleUnits){
          list={saleUnitName:saleUnit.saleUnitName,
                quantity:saleUnit.quantity};
          saleUnitList.push(list)
      }
    }

    const saleUnitGroup = saleUnitList.reduce((accumulator, item) => {
      return !accumulator[item.saleUnitName]
      ? {...accumulator, [item.saleUnitName]: item.quantity}
      : { ...accumulator, [item.saleUnitName]: accumulator[item.saleUnitName] + item.quantity }
      }, {})

    return saleUnitGroup;
  }
}