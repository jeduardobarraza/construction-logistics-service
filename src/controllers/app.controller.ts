import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  ping(): string {
    return this.appService.ping();
  }
}
