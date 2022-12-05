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
import { ProjectLocationDto } from 'src/dto/projectLocation.dto';
import { ProjectLocationService } from 'src/services/projectLocation.service';

@Controller('project/:projectId/locations')
export class ProjectLocationController {
  constructor(private readonly projectLocationService: ProjectLocationService) {}

  @Get('ping')
  ping(): string {
    return this.projectLocationService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Param('projectId') projectId: string, @Body() request: ProjectLocationDto): Promise<any> {
    return await this.projectLocationService.create(projectId, request);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProjectLocations(): Promise<any> {
    return await this.projectLocationService.getProjectLocations();
  }

  @Get('/:projectLocationId')
  @HttpCode(HttpStatus.OK)
  async getProjectById(@Param('projectLocationId') projectLocationId: string): Promise<any> {
    return await this.projectLocationService.getProjectLocationById(projectLocationId);
  }

  @Put('/:projectLocationId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('projectLocationId') projectLocationId: string,
    @Body() request: ProjectLocationDto,
  ): Promise<any> {
    return await this.projectLocationService.update(projectLocationId, request);
  }

  @Delete('/:projectLocationId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('projectLocationId') projectLocationId: string): Promise<any> {
    return await this.projectLocationService.delete(projectLocationId);
  }

  // @Get('/:projectId/pieces')
  // @HttpCode(HttpStatus.OK)
  // async getPiecesFromProject(@Param('projectId') projectId: string): Promise<any> {
  //   return await this.projectService.getPiecesFromProject(projectId);
  // }
}
