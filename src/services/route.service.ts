import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { RouteDto } from 'src/dto/route.dto';
import { Route } from 'src/entities/route.entity';
import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
import { generalMessages, routeMessages } from 'src/utils/friendlyMessage';

import { util } from 'src/utils/util';

@Injectable()
export class RouteService {
  constructor(
    @InjectModel(Route.name)
    private routeModel: Model<Route>,
  ) {}

  ping() {
    return '*********Route Service Works*************';
  }

  async create(route: RouteDto) {
    try {
      const routeDocument = {
        ...route,
        routeId: util.getShortId(),
      };
      return await new this.routeModel(routeDocument).save();
    } catch (error) {
      const hasDuplicateKeyText = (error.message || '')
        .toString()
        .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
      if (hasDuplicateKeyText)
        throw new ConflictException(routeMessages.duplicate);
      throw new InternalServerErrorException(routeMessages.saveError);
    }
  }

  async getRoutes() {
    const routes = await this.routeModel
      .find()
      .sort({ name: 1 })
      .catch((error) => {
        throw new InternalServerErrorException(
          generalMessages.findMongoDocuments,
          error.message,
        );
      })
      .then((data) => data);
    return routes;
  }

  async getRouteById(routeId: string) {
    const filter: FilterQuery<Route> = { routeId };
    const savedRoute = await this.routeModel.findOne(filter).exec();
    if (!savedRoute) throw new NotFoundException(generalMessages.notFoundItem);
    return savedRoute;
  }

  async update(routeId: string, route: RouteDto) {
    const savedRoute = await this.getRouteById(routeId);
    return this.routeModel.findByIdAndUpdate(savedRoute._id, route, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  async delete(routeId: string) {
    const savedRoute = await this.getRouteById(routeId);
    return this.routeModel.findByIdAndRemove(savedRoute._id);
  }

}