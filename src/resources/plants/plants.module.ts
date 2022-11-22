import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTIONS } from 'src/mongo/connections/mongo-connections.interface';
import { Plant, PlantSchema } from 'src/mongo/schemas/plants/plants.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }], MONGO_CONNECTIONS.PLANTS)

  ],
  controllers: [PlantsController],
  providers: [PlantsService]
})
export class PlantsModule { }
