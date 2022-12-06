import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { iUser } from 'src/resources/users/entities/user.entity';
import { Like, LikeSchema } from '../likes/like.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  // _id?: any;

  @Prop()
  created_at: string;

  @Prop({ immutable: true })
  email: string;

  @Prop()
  email_verified: boolean;

  @Prop()
  family_name: string;

  @Prop()
  gender: string;

  @Prop()
  given_name: string;

  @Prop()
  name: string;

  @Prop()
  nickname: string;

  @Prop()
  picture: string;

  @Prop()
  updated_at: string;

  @Prop()
  user_id: string;

  @Prop()
  last_ip: string;

  @Prop()
  last_login: string;

  @Prop()
  logins_count: number;

  @Prop({ type: {}, default: {} })
  app_metadata;

  @Prop({ type: {}, default: {} })
  user_metadata;

  @Prop({
    type: {
      _id: false,
      likes: [LikeSchema],
      mongo_synced: Boolean
    }, default: { mongo_synced: true }
  })
  custom_metadata;

  @Prop({ type: [{}] })
  identities;

  @Prop()
  birthdate?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
