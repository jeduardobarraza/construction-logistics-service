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
import { PieceDto } from 'src/dto/piece.dto';
import { PieceService } from 'src/services/piece.service';

@Controller('piece')
export class PieceController {
  constructor(private readonly pieceService: PieceService) {}

  @Get('ping')
  ping(): string {
    return this.pieceService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() request: PieceDto): Promise<any> {
    return await this.pieceService.create(request);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getPieces(@Query() query): Promise<any> {
    return await this.pieceService.getPieces(query?.type);
  }

  @Get('/:pieceId')
  @HttpCode(HttpStatus.OK)
  async getPieceById(@Param('pieceId') pieceId: string): Promise<any> {
    return await this.pieceService.getPieceById(pieceId);
  }

  @Put('/:pieceId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('pieceId') pieceId: string,
    @Body() request: PieceDto,
  ): Promise<any> {
    return await this.pieceService.update(pieceId, request);
  }

  @Delete('/:pieceId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('pieceId') pieceId: string): Promise<any> {
    return await this.pieceService.delete(pieceId);
  }
}
