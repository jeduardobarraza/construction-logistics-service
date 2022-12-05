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
import { SetDto } from 'src/dto/set.dto';
import { SetService } from 'src/services/set.service';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Get('ping')
  ping(): string {
    return this.setService.ping();
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  async create(@Body() request: SetDto): Promise<any> {
    return await this.setService.create(request);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async getSets(): Promise<any> {
    return await this.setService.getSets();
  }

  @Get('/:setId')
  @HttpCode(HttpStatus.OK)
  async getPieceById(@Param('setId') setId: string): Promise<any> {
    return await this.setService.getSetById(setId);
  }

  @Put('/:setId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('setId') setId: string,
    @Body() request: SetDto,
  ): Promise<any> {
    return await this.setService.update(setId, request);
  }

  @Delete('/:setId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('setId') setId: string): Promise<any> {
    return await this.setService.delete(setId);
  }

  @Get('/:setId/pieces')
  @HttpCode(HttpStatus.OK)
  async getPiecesFromSet(@Param('setId') setId: string): Promise<any> {
    return await this.setService.getPiecesFromSet(setId);
  }
}
