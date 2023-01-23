import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { find } from 'rxjs';
import { ProjectDto } from 'src/dto/project.dto';
import { Project } from 'src/entities/project.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { projectMessages, generalMessages } from 'src/utils/friendlyMessage';
import { util } from 'src/utils/util';
import { SaleUnitService } from './saleUnit.service';
import { get, split, set, cloneDeep, cloneWith } from 'lodash';
import { SaleUnit } from '../entities/saleUnit.entity';
import { SetService } from './set.service';

@Injectable()
export class ProjectService {

  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
    private saleUnitService: SaleUnitService,
    private setService: SetService

  ) {}

  ping() {
    return '*********Project Service Works*************';
  }

  async create(project: ProjectDto) {
    try {
      const projectDocument = {
        ...project,
        projectId: util.getShortId(),
      };

      await this.createSalesUnitsFromProject(projectDocument);

      console.log('projectDocument: ');
      console.log(projectDocument);
      return await new this.projectModel(projectDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(projectMessages.duplicate);
      throw new InternalServerErrorException(projectMessages.saveError);
    }
  }

  async getProjects() {
    const projects = await this.projectModel
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

  async getProjectById(projectId: string) {
    const filter: FilterQuery<Project> = { projectId };
    const savedProject = await this.projectModel.findOne(filter).exec();
    if (!savedProject) throw new NotFoundException(generalMessages.notFoundItem);
    return savedProject;
  }

  async update(projectId: string, project: ProjectDto) {
    const savedProject = await this.getProjectById(projectId);
    const projectDocument = {
      ...project,
      projectId: projectId,
    };
    await this.createSalesUnitsFromProject(projectDocument);

    return this.projectModel.findByIdAndUpdate(savedProject._id, project, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(projectId: string) {
    const savedProject = await this.getProjectById(projectId);
    return this.projectModel.findByIdAndRemove(savedProject._id);
  }

  async getPiecesFromProject(projectId: string){
    const savedProject = await this.getProjectById(projectId);
    let saleUnits:any[]=[];
    for(let detail of savedProject.detail){
      saleUnits.push(detail);
    }
    let pieceList:any[]=[];
    if(saleUnits){
      for(let saleUnit of saleUnits){
        if(saleUnit.saleUnit.pieces){
          for(let piece of saleUnit.saleUnit.pieces){
            piece.quantity*=saleUnit.quantity;
          }
          pieceList=pieceList.concat(saleUnit.saleUnit.pieces);
        }
        if(saleUnit.saleUnit.sets){
          for(let set of saleUnit.saleUnit.sets){
            if(set.sets){
              const setPieces= await this.getPiecesFromSetUnit(set);
              for(let setPiece of setPieces){
                setPiece.quantity=setPiece.quantity*saleUnit.quantity;
              }
              pieceList=pieceList.concat(setPieces);
            }
          }
        }
      }
    }
    return await this.saleUnitService.groupingByPieceId(pieceList);
    //return pieceList;
  }

  async getPiecesFromSetUnit(setSaved){
    const sets:any[]=setSaved.sets;
    let setPieceList:any[]=setSaved.pieces;
    if(sets){
      for(let set of sets){
        let pieces=set.pieces;
        for (let piece of pieces){
          setPieceList=setPieceList.concat(piece);
        }
        if(set.sets){
          const setPieces= await this.getPiecesFromSetUnit(set.sets);
          if(setPieces!=null){
            setPieceList= [...setPieceList, setPieces];
          }
        }
      }
    }
    return(setPieceList);
  }

  async createSalesUnitsFromProject(Document){
    const project=Document;
    let saleUnits:any[]=[];
    for(let detail of project.detail){
      saleUnits.push(detail);
    }
    //const salesUnits=project.detail;
    console.log('saleUnits: ');
    console.log(saleUnits);
    const projectId=project.projectId;
    let salesUnitList = await this.saleUnitService.getSaleUnits();
    let duplicate=false;
    for(let unit of saleUnits){
      console.log('unit.reference:  ' + unit.reference);
      duplicate=false;
      for(let saleUnit of salesUnitList){
        if(unit.reference==saleUnit.reference){
          duplicate=true;
          this.saleUnitService.delete(saleUnit.saleUnitId).then(
            (data) => {
              console.log('**********deleteSaleUnit***********');
            },
            (error) => {
              console.log(error, 'error/ping');
            }
          ).then(()=>{
            this.saleUnitService.create(projectId, unit).then(
              (data) => {
                console.log('**********createSaleUnit***********');
              },
              (error) => {
                console.log(error, 'error/ping');
              }
            );
          });
        }
      }
      if(duplicate){
        this.saleUnitService.create(projectId, unit).then(
          (data) => {
            console.log('**********createSaleUnit***********');
          },
          (error) => {
            console.log(error, 'error/ping');
          }
        );
      }
    }
    return true;
  }

  async getQuantityOfSaleUnitFromProject(projectId: string, saleUnitName: string){
    const savedProject = await this.getProjectById(projectId);
    const saleUnitList=savedProject.detail;
    let saleUnits:any[]=[];
    for(let saleUnit of saleUnitList){
      saleUnits.push(saleUnit);
    }

    for(let saleUnit of saleUnits){
      if(saleUnitName==saleUnit.name){
        return saleUnit.quantity;
      }
    }
  }

  async validateSetInUse(setId:string){
    const savedProjects = await this.getProjects();
    let message: Boolean=false;
    if(savedProjects.length>0){
    for(let i=0; i<savedProjects.length;i++){
      for(let j=0;j<savedProjects[i].detail.length;j++){
        let clonedSaleUnits = cloneDeep(savedProjects[i].detail[j]);
        if(clonedSaleUnits){
          for(let i=0;i<clonedSaleUnits.sets.length;i++){
            if(clonedSaleUnits.sets[i].setId==setId){
              console.log('set>>>>>>>',clonedSaleUnits.sets[i]);
              message= true;
              return message;
            }
          }
        }
      }
    }
    }
    return message;
  }

  async validatePieceInUse(pieceId:string){
    const savedProjects = await this.getProjects();
    let message: Boolean=false;
    if(savedProjects.length>0){
      for(let i=0; i<savedProjects.length;i++){
        for(let j=0;j<savedProjects[i].detail.length;j++){
          let clonedSaleUnits = cloneDeep(savedProjects[i].detail[j]);
          if(clonedSaleUnits){
            for(let i=0;i<clonedSaleUnits.pieces.length;i++){
              if(clonedSaleUnits.pieces[i].pieceId==pieceId){
                message= true;
                return message;
              }
            }
            for(let i=0;i<clonedSaleUnits.sets.length;i++){
              for(let j=0;j<clonedSaleUnits.sets[i].pieces.length;j++){
                if(clonedSaleUnits.sets[i].pieces[j].pieceId==pieceId){
                  message= true;
                  return message;
                }
              }
            }
          }
        }
      }
    }
    return message;
  }
  // groupingByPieceReference = (piecesArray) => {
  //   let groupedPieces:any[]=[];
  //   let piecesArrayList:any[]=piecesArray;
  //   let auxPiecesArray:any[]=piecesArray;
  //   let cont:number=0;
  //   let quantity:number=0;
  //   for(let [index, piecesList] of piecesArrayList.entries()){
  //     cont=0;
  //     quantity=0;
  //     let reference:string =piecesList.reference;
  //     for(let [jindex, auxPieces] of auxPiecesArray.entries()){
  //       if(reference===auxPieces.reference){
  //         cont++;
  //         quantity+=auxPieces.quantity;
  //         auxPiecesArray[jindex]={};
  //       }
  //     }
  //     if(cont>1 && quantity>1){
  //       groupedPieces.push(piecesList);
  //       groupedPieces[groupedPieces.length-1].quantity=quantity;
  //     }else if(cont==1 && quantity>=1){
  //       groupedPieces.push(piecesList);
  //     }

  //   }
  //   return groupedPieces
  // }
}
