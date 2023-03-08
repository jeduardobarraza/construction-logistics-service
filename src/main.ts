import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { Document } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options =new DocumentBuilder().setDescription('Servicios para logistica de obra - Latelier')
  .setVersion('1.0')
  .addTag('services')
  .build();

  const document = SwaggerModule.createDocument(app,options);

  SwaggerModule.setup('swagger/index.html',app,document, {
    explorer: true,
    swaggerOptions:{
      filter:true,
      showRequestDuration: true,
    }
  });

  //app.UseSwagger();
  //app.UseSwaggerUI();
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
