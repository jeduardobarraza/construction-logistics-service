import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { find } from 'rxjs';
import { ProjectLocationDto } from 'src/dto/projectLocation.dto';
import { ProjectLocation } from 'src/entities/projectLocation.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { projectLocationMessages, generalMessages } from 'src/utils/friendlyMessage';
import { util } from 'src/utils/util';
import { SaleUnitService } from './saleUnit.service';
import { ProjectLocationController } from '../controllers/projectLocation.controller';

@Injectable()
export class ProjectLocationService {

  constructor(
    @InjectModel(ProjectLocation.name)
    private projectLocationModel: Model<ProjectLocation>,
  ) {}

  ping() {
    return '*********Project Location Service Works*************';
  }

  async create(paramProjectId: string, projectLocation: ProjectLocationDto) {

    try {
      const projectLocationDocument = {
        ...projectLocation,
        projectLocationId: util.getShortId(),
        projectId:paramProjectId,
      };
      console.log(projectLocationDocument);
      return await new this.projectLocationModel(projectLocationDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(projectLocationMessages.duplicate);
      throw new InternalServerErrorException(projectLocationMessages.saveError);
    }
  }


  async getProjectLocations() {
    const projects = await this.projectLocationModel
      .find()
      .sort({ name: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return projects;
  }

  async getProjectLocationByProjectId(projectId: string) {
    const filter: FilterQuery<ProjectLocation> = { projectId };
    const savedProjectLocation = await this.projectLocationModel.findOne(filter).exec();
    if (!savedProjectLocation) throw new NotFoundException(generalMessages.notFoundItem);
    return savedProjectLocation;
  }

  async getProjectLocationById(projectLocationId: string) {
    const filter: FilterQuery<ProjectLocation> = { projectLocationId };
    const savedProjectLocation = await this.projectLocationModel.findOne(filter).exec();
    if (!savedProjectLocation) throw new NotFoundException(generalMessages.notFoundItem);
    return savedProjectLocation;
  }

  async update(projectLocationId: string, projectLocation: ProjectLocationDto) {
    const savedProjectLocation = await this.getProjectLocationById(projectLocationId);
    return this.projectLocationModel.findByIdAndUpdate(savedProjectLocation._id, projectLocation, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(projectLocationId: string) {
    const savedProjectLocation = await this.getProjectLocationById(projectLocationId);
    return this.projectLocationModel.findByIdAndRemove(savedProjectLocation._id);
  }

  // async getPiecesFromProject(projectId: string){
  //   const savedProject = await this.getProjectById(projectId);
  //   let saleUnits:any[]=[];
  //   for(let detail of savedProject.detail){
  //     saleUnits.push(detail);
  //   }
  //   let pieceList:any[]=[];
  //   if(saleUnits){
  //     for(let saleUnit of saleUnits){
  //       if(saleUnit.saleUnit.pieces){
  //         for(let piece of saleUnit.saleUnit.pieces){
  //           piece.quantity*=saleUnit.quantity;
  //         }
  //         pieceList=pieceList.concat(saleUnit.saleUnit.pieces);
  //       }
  //       if(saleUnit.saleUnit.sets){
  //         for(let set of saleUnit.saleUnit.sets){
  //           if(set.sets){
  //             const setPieces= await this.getPiecesFromSetUnit(set);
  //             for(let setPiece of setPieces){
  //               setPiece.quantity=setPiece.quantity*saleUnit.quantity;
  //             }
  //             pieceList=pieceList.concat(setPieces);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return await this.saleUnitService.groupingByPieceId(pieceList);
  //   //return pieceList;
  // }

  // async getPiecesFromSetUnit(setSaved){
  //   const sets:any[]=setSaved.sets;
  //   let setPieceList:any[]=setSaved.pieces;
  //   if(sets){
  //     for(let set of sets){
  //       let pieces=set.pieces;
  //       for (let piece of pieces){
  //         setPieceList=setPieceList.concat(piece);
  //       }
  //       if(set.sets){
  //         const setPieces= await this.getPiecesFromSetUnit(set.sets);
  //         if(setPieces!=null){
  //           setPieceList= [...setPieceList, setPieces];
  //         }
  //       }
  //     }
  //   }
  //   return(setPieceList);
  // }

}
