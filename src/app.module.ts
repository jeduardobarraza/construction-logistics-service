import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './controllers/app.controller';
import { ProjectController } from './controllers/project.controller';
import { PieceController } from './controllers/piece.controller';
import { SetController } from './controllers/set.controller';
import { SaleUnitController } from './controllers/saleUnit.controller';
import { OrderController } from './controllers/Order.controller';
import { RouteController } from './controllers/Route.controller';
import { ProjectLocationController } from './controllers/projectLocation.controller';

import { Project, ProjectSchema } from './entities/project.entity';
import { Piece, PieceSchema } from './entities/piece.entity';
import { Set, SetSchema } from './entities/set.entity';
import { SaleUnit, SaleUnitSchema } from './entities/saleUnit.entity';
import { Order, OrderSchema } from './entities/order.entity';
import { Route, RouteSchema } from './entities/route.entity';
import { ProjectLocation, ProjectLocationSchema } from './entities/projectLocation.entity';

import dbConfig from './modules/db-config';
import { PersistenceModule } from './modules/persistence.module';

import { AppService } from './services/app.service';
import { ProjectService } from './services/project.service';
import { PieceService } from './services/piece.service';
import { SetService } from './services/set.service';
import { SaleUnitService } from './services/saleUnit.service';
import { OrderService } from './services/order.service';
import { RouteService } from './services/route.service';
import { ProjectLocationService } from './services/projectLocation.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Piece.name, schema: PieceSchema },
      { name: Set.name, schema: SetSchema },
      { name: SaleUnit.name, schema: SaleUnitSchema },
      { name: Order.name, schema: OrderSchema },
      { name: Route.name, schema: RouteSchema},
      { name: ProjectLocation.name, schema: ProjectLocationSchema},
    ]),
    PersistenceModule,
  ],
  controllers: [
    AppController,
    ProjectController,
    PieceController,
    SetController,
    SaleUnitController,
    OrderController,
    RouteController,
    ProjectLocationController,
  ],
  providers: [
    AppService,
    ProjectService,
    PieceService,
    SetService,
    SaleUnitService,
    OrderService,
    RouteService,
    ProjectLocationService,
  ],
})
export class AppModule {}
