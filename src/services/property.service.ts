// import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { FilterQuery, Model } from 'mongoose';
// import { PropertyDto } from 'src/dto/property.dto';
// import { Property } from 'src/entities/property.entity';
// import { TEXT_TO_VALIDATE_MONGO_DUPLICATES } from 'src/utils/constants';
// import { generalMessages, propertiesMessages } from 'src/utils/friendlyMessage';

// import { util } from 'src/utils/util';

// @Injectable()
// export class PropertyService {

//   constructor(
//     @InjectModel(Property.name)
//     private propertyModel: Model<Property>,
//   ) {}

//   ping() {
//     return '*********Property Service Works*************';
//   }

//   async create(property: PropertyDto) {
//     try {
//       const propertyDocument = {
//         ...property,
//         propertyId: util.getShortId(),
//       };
//       return await new this.propertyModel(propertyDocument).save();
//     } catch (error) {
//       const hasDuplicateKeyText = (error.message || '')
//         .toString()
//         .includes(TEXT_TO_VALIDATE_MONGO_DUPLICATES);
//       if (hasDuplicateKeyText)
//         throw new ConflictException(propertiesMessages.duplicate);
//       throw new InternalServerErrorException(propertiesMessages.saveError);
//     }
//   }

//   async getProperties() {
//     const properties = await this.propertyModel
//       .find()
//       .sort({ name: 1 })
//       .catch((error) => {
//         throw new InternalServerErrorException(
//           generalMessages.findMongoDocuments,
//           error.message,
//         );
//       })
//       .then((data) => data);
//     return properties;
//   }

//   async getPropertyById(propertyId: string) {
//     const filter: FilterQuery<Property> = { propertyId };
//     const savedProperty = await this.propertyModel.findOne(filter).exec();
//     if (!savedProperty) throw new NotFoundException(generalMessages.notFoundItem);
//     return savedProperty;
//   }

//   async update(propertyId: string, property: PropertyDto) {
//     const savedProperty = await this.getPropertyById(propertyId);
//     return this.propertyModel.findByIdAndUpdate(savedProperty._id, property, {
//       upsert: true,
//       new: true,
//       setDefaultsOnInsert: true,
//     });
//   }

//   async delete(propertyId: string) {
//     const savedProperty = await this.getPropertyById(propertyId);
//     return this.propertyModel.findByIdAndRemove(savedProperty._id);
//   }

// }
