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
import { SalaryDto } from 'src/dto/salary.dto';
import { SalaryService } from 'src/services/salary.service';


@Controller('salaryService')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get('ping')
  ping(): string {
    return this.salaryService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() request: SalaryDto): Promise<any> {
    return await this.salaryService.create(request);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getSalaries(@Query() query): Promise<any> {
    return await this.salaryService.getSalaries(query?.type);
  }

  @Get('/:salaryId')
  @HttpCode(HttpStatus.OK)
  async getSalaryById(@Param('salaryId') salaryId: string): Promise<any> {
    return await this.salaryService.getSalaryById(salaryId);
  }

  @Put('/:salaryId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('salaryId') salaryId: string,
    @Body() request: SalaryDto,
  ): Promise<any> {
    return await this.salaryService.update(salaryId, request);
  }

  @Delete('/:salaryId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('salaryId') salaryId: string): Promise<any> {
    return await this.salaryService.delete(salaryId);
  }
}
