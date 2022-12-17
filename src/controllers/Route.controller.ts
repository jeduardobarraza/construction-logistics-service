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
import { RouteService } from 'src/services/route.service';
import { RouteDto } from 'src/dto/route.dto';

@Controller('project/:projectId/Route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get('ping')
  ping(): string {
    return this.routeService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Param('projectId') projectId: string,@Body() request: RouteDto): Promise<any> {
    return await this.routeService.create(projectId,request);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getOrders(): Promise<any> {
    return await this.routeService.getRoutes();
  }

  @Get('/:routeId')
  @HttpCode(HttpStatus.OK)
  async getRouteById(@Param('routeId') routeId: string): Promise<any> {
    return await this.routeService.getRouteById(routeId);
  }

  @Put('/:routeId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('routeId') routeId: string,
    @Body() request: RouteDto,
  ): Promise<any> {
    return await this.routeService.update(routeId, request);
  }

  @Delete('/:routeId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('routeId') routeId: string): Promise<any> {
    return await this.routeService.delete(routeId);
  }


}
