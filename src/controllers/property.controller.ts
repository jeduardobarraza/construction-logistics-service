// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Param,
//   Post,
//   Put,
// } from '@nestjs/common';
// import { PropertyDto } from 'src/dto/property.dto';
// import { PropertyService } from 'src/services/property.service';

// @Controller('property')
// export class PropertyController {
//   constructor(private readonly propertyService: PropertyService) {}

//   @Get('ping')
//   ping(): string {
//     return this.propertyService.ping();
//   }

//   @Post('')
//   @HttpCode(HttpStatus.OK)
//   async create(@Body() request: PropertyDto): Promise<any> {
//     return await this.propertyService.create(request);
//   }

//   @Get('')
//   @HttpCode(HttpStatus.OK)
//   async getProperties(): Promise<any> {
//     return await this.propertyService.getProperties();
//   }

//   @Get('/:propertyId')
//   @HttpCode(HttpStatus.OK)
//   async getPropertyById(@Param('propertyId') propertyId: string): Promise<any> {
//     return await this.propertyService.getPropertyById(propertyId);
//   }

//   @Put('/:propertyId')
//   @HttpCode(HttpStatus.OK)
//   async update(
//     @Param('propertyId') propertyId: string,
//     @Body() request: PropertyDto,
//   ): Promise<any> {
//     return await this.propertyService.update(propertyId, request);
//   }

//   @Delete('/:propertyId')
//   @HttpCode(HttpStatus.OK)
//   async delete(@Param('propertyId') propertyId: string): Promise<any> {
//     return await this.propertyService.delete(propertyId);
//   }
// }
