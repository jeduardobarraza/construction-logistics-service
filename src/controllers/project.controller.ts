import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectDto } from 'src/dto/project.dto';
import { ProjectService } from 'src/services/project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('ping')
  ping(): string {
    return this.projectService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() request: ProjectDto): Promise<any> {
    return await this.projectService.create(request);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getConstructions(): Promise<any> {
    return await this.projectService.getProjects();
  }

  @Get('/:projectId')
  @HttpCode(HttpStatus.OK)
  async getProjectById(@Param('projectId') projectId: string): Promise<any> {
    return await this.projectService.getProjectById(projectId);
  }

  @Put('/:projectId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('projectId') projectId: string,
    @Body() request: ProjectDto,
  ): Promise<any> {
    return await this.projectService.update(projectId, request);
  }

  @Delete('/:projectId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('projectId') projectId: string): Promise<any> {
    return await this.projectService.delete(projectId);
  }

  @Get('/:projectId/pieces')
  @HttpCode(HttpStatus.OK)
  async getPiecesFromProject(@Param('projectId') projectId: string): Promise<any> {
    return await this.projectService.getPiecesFromProject(projectId);
  }

  @Get('/:projectId/:saleUnitName/quantity')
  @HttpCode(HttpStatus.OK)
  async getQuantityOfSaleUnitFromProject(@Param('projectId') projectId: string, @Param('saleUnitName') saleUnitName: string): Promise<any> {
    return await this.projectService.getQuantityOfSaleUnitFromProject(projectId, saleUnitName);
  }

  @Get('/validateSet/:setId')
  @HttpCode(HttpStatus.OK)
  async validateSetInUse(@Param('setId') setId:string):Promise<any>{
    return await this.projectService.validateSetInUse(setId);
  }
}
