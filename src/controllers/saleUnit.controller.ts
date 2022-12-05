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
import { SaleUnitDto } from 'src/dto/saleUnit.dto';
import { SaleUnitService } from 'src/services/saleUnit.service';

@Controller('saleUnit')
export class SaleUnitController {
  constructor(private readonly saleUnitService: SaleUnitService) {}

  @Get('ping')
  ping(): string {
    return this.saleUnitService.ping();
  }

  @Post('/:projectId')
  @HttpCode(HttpStatus.OK)
  async create(@Param('projectId') projectId: string, @Body() request: SaleUnitDto): Promise<any> {
    return await this.saleUnitService.create(projectId, request);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getSaleUnits(): Promise<any> {
    return await this.saleUnitService.getSaleUnits();
  }

  @Get('/:saleUnitId')
  @HttpCode(HttpStatus.OK)
  async getSaleUnitById(@Param('saleUnitId') saleUnitId: string): Promise<any> {
    return await this.saleUnitService.getSaleUnitById(saleUnitId);
  }

  @Put('/:saleUnitId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('saleUnitId') saleUnitId: string,
    @Body() request: SaleUnitDto,
  ): Promise<any> {
    return await this.saleUnitService.update(saleUnitId, request);
  }

  @Delete('/:saleUnitId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('saleUnitId') saleUnitId: string): Promise<any> {
    return await this.saleUnitService.delete(saleUnitId);
  }

  @Get('/:saleUnitId/pieces')
  @HttpCode(HttpStatus.OK)
  async getPiecesFromSaleUnit(@Param('saleUnitId') saleUnitId: string): Promise<any> {
    return await this.saleUnitService.getPiecesFromSaleUnit(saleUnitId);
  }

}
