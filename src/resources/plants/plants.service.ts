import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MONGO_CONNECTIONS } from 'src/mongo/connections/mongo-connections.interface';
import { Plant, PlantDocument } from 'src/mongo/schemas/plants/plants.schema';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Injectable()
export class PlantsService {
  constructor(
    @InjectModel(Plant.name, MONGO_CONNECTIONS.PLANTS) private plantModel: Model<PlantDocument>

  ) { }
  create(createPlantDto: CreatePlantDto) {
    return 'This action adds a new plant';
  }

  async findAll() {
    return await this.plantModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} plant`;
  }

  update(id: number, updatePlantDto: UpdatePlantDto) {
    return `This action updates a #${id} plant`;
  }

  remove(id: number) {
    return `This action removes a #${id} plant`;
  }
}
