import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlantDocument = HydratedDocument<Plant>;

@Schema()
export class Plant {

  // _id?: any;

  @Prop()
  name: string;

  @Prop()
  family: string

  @Prop({
    type: {
      url: String
    }, default: {},
    _id: false
  })
  image: string

  @Prop()
  size: string

  @Prop()
  prize: string

  @Prop({
    type: {
      WATER: Number,
      LIGHT: Number,
      HUMIDITY: Boolean
    }, default: {},
    _id: false
  })
  props: string

  @Prop({
    type: {
      PETFRIENDLY: Boolean,
      SEASONAL: Boolean,
    }, default: {},
    _id: false
  })
  alt_props: string



}

export const PlantSchema = SchemaFactory.createForClass(Plant);
