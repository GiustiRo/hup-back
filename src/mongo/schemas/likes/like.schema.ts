import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema()
export class Like {
  // _id?: any;
  @Prop({ immutable: true })
  itemId: string;
  @Prop()
  collectionName: string;
  @Prop({ immutable: true })
  type: string;

}

export const LikeSchema = SchemaFactory.createForClass(Like);
