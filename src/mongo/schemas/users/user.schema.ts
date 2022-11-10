import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { iUser } from 'src/resources/users/entities/user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends iUser {
  // @Prop()
  // name: string;

  // @Prop()
  // age: number;

  // @Prop()
  // breed: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
