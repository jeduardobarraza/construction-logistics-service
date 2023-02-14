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
import { EmployeeDto } from 'src/dto/employee.dto';
import { EmployeeService } from 'src/services/employee.service';


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('ping')
  ping(): string {
    return this.employeeService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() request: EmployeeDto): Promise<any> {
    return await this.employeeService.create(request);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getEmployees(@Query() query): Promise<any> {
    return await this.employeeService.getEmployees(query?.type);
  }

  @Get('/:employeeId')
  @HttpCode(HttpStatus.OK)
  async getEmployeeById(@Param('employeeId') employeeId: string): Promise<any> {
    return await this.employeeService.getEmployeeById(employeeId);
  }

  @Put('/:employeeId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('employeeId') employeeId: string,
    @Body() request: EmployeeDto,
  ): Promise<any> {
    return await this.employeeService.update(employeeId, request);
  }

  @Delete('/:employeeId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('employeeId') employeeId: string): Promise<any> {
    return await this.employeeService.delete(employeeId);
  }
}
