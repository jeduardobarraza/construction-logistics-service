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
  Query,
} from '@nestjs/common';
import { ContractorDto } from 'src/dto/contractor.dto';
import { ContractorService } from 'src/services/contractor.service';

@Controller('contractor')
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) {}

  @Get('ping')
  ping(): string {
    return this.contractorService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() request: ContractorDto): Promise<any> {
    return await this.contractorService.create(request);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getContractors(@Query() query): Promise<any> {
    return await this.contractorService.getContractors(query?.type);
  }

  @Get('/:contractorId')
  @HttpCode(HttpStatus.OK)
  async getContractorById(@Param('contractorId') contractorId: string): Promise<any> {
    return await this.contractorService.getContractorById(contractorId);
  }

  // @Put('/:contractorId')
  // @HttpCode(HttpStatus.OK)
  // async update(
  //   @Param('contractorId') contractorId: string,
  //   @Body() request: ContractorDto,
  // ): Promise<any> {
  //   return await this.contractorService.update(contractorId, request);
  // }

  // @Delete('/:contractorId')
  // @HttpCode(HttpStatus.OK)
  // async delete(@Param('contractorId') contractorId: string): Promise<any> {
  //   return await this.contractorService.delete(contractorId);
  // }
}
