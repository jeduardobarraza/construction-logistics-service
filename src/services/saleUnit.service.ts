import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { SaleUnitDto } from 'src/dto/saleUnit.dto';
import { SaleUnit } from 'src/entities/saleUnit.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { generalMessages, saleUnitMessages } from 'src/utils/friendlyMessage';

import { util } from 'src/utils/util';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class SaleUnitService {
  constructor(
    @InjectModel(SaleUnit.name)
    private saleUnitModel: Model<SaleUnit>,
  ) {}

  ping() {
    return '*********SaleUnit Service Works*************';
  }

  async create(projId:string, saleUnit: SaleUnitDto) {
    console.log('create SaleUnit: ');
    console.log(saleUnit);
    try {
      const saleUnitDocument = {
        ...saleUnit,
        saleUnitId: util.getShortId(),
        projectId:projId,
      };
      return await new this.saleUnitModel(saleUnitDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(saleUnitMessages.duplicate);
      throw new InternalServerErrorException(saleUnitMessages.saveError);
    }
  }

  async getSaleUnits() {
    const saleUnits = await this.saleUnitModel
      .find()
      .sort({ name: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return saleUnits;
  }

  async getSaleUnitById(saleUnitId: string) {
    const filter: FilterQuery<SaleUnit> = { saleUnitId };
    const savedSaleUnit = await this.saleUnitModel.findOne(filter).exec();
    if (!savedSaleUnit) throw new NotFoundException(generalMessages.notFoundItem);
    return savedSaleUnit;
  }

  async update(saleUnitId: string, saleUnit: SaleUnitDto) {
    const savedSaleUnit = await this.getSaleUnitById(saleUnitId);
    return this.saleUnitModel.findByIdAndUpdate(savedSaleUnit._id, saleUnit, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(saleUnitId: string) {
    const savedSaleUnit = await this.getSaleUnitById(saleUnitId);
    return this.saleUnitModel.findByIdAndRemove(savedSaleUnit._id);
  }

  async getPiecesFromSaleUnit(saleUnitId:string){
    const savedSaleUnit = await this.getSaleUnitById(saleUnitId);
    const sets=savedSaleUnit.sets;
    let pieceList:any[]=savedSaleUnit.pieces;
    if(sets){
      for(let set of sets){
        if(set.sets){
          const setPieces=await this.getPiecesFromSetUnit(set);
          pieceList=pieceList.concat(setPieces);
        }
    }
    }
    return await this.groupingByPieceId(pieceList);
    //return pieceList;
  }

  async getPiecesFromSetUnit(setSaved){
    const sets:any[]=setSaved.sets;
    let setPieceList:any[]=setSaved.pieces;
    if(sets){
      for(let set of sets){
        let pieces=set.pieces;
        for (let piece of pieces){
          setPieceList.push(piece);
        }
        if(set.sets){
          const setPieces= await this.getPiecesFromSetUnit(set.sets)
          if(setPieces!=null){
            setPieceList= [...setPieceList, setPieces]
          }
        }
      }
    }
    return(setPieceList);
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


}