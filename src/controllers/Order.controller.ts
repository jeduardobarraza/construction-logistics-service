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
import { OrderService } from 'src/services/order.service';
import { OrderDto } from 'src/dto/order.dto';

@Controller('/project/:projectId/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('ping')
  ping(): string {
    return this.orderService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Param('projectId') projectId: string, @Body() request: OrderDto): Promise<any> {
    return await this.orderService.create(projectId, request);
  }

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async getOrders(): Promise<any> {
    return await this.orderService.getOrders();
  }

  @Get('/:orderId')
  @HttpCode(HttpStatus.OK)
  async getOrderById(@Param('orderId') orderId: string): Promise<any> {
    return await this.orderService.getOrderById(orderId);
  }

  @Put('/:orderId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('orderId') orderId: string,
    @Body() request: OrderDto,
  ): Promise<any> {
    return await this.orderService.update(orderId, request);
  }

  @Delete('/:orderId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('orderId') orderId: string): Promise<any> {
    return await this.orderService.delete(orderId);
  }

  @Get('/:orderId/pieces')
  @HttpCode(HttpStatus.OK)
  async getPiecesFromOrder(@Param('orderId') orderId: string): Promise<any> {
    return await this.orderService.getPiecesFromOrder(orderId);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getOrderByProjectId(@Param('projectId') projectId: string): Promise<any> {
    return await this.orderService.getOrderByProjectId(projectId);
  }

  @Get('/quantity/saleUnits')
  @HttpCode(HttpStatus.OK)
  async getQuantityOfSaleUnitFromOrders(@Param('projectId') projectId: string): Promise<any> {
    return await this.orderService.getQuantityOfSaleUnitFromOrders(projectId);
  }

}
