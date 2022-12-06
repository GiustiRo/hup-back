import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageService } from 'src/storage/storage/storage.service';
import storageConfig from 'src/config/storage.config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/mongo/schemas/users/user.schema';
import { MONGO_CONNECTIONS } from 'src/mongo/connections/mongo-connections.interface';
// import { LikesModule } from '../likes/likes.module';
import { Like, LikeSchema } from 'src/mongo/schemas/likes/like.schema';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forFeature(storageConfig),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Like.name, schema: LikeSchema }
    ], MONGO_CONNECTIONS.USERS),
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService, StorageService],
  exports: [MongooseModule]
})
export class UsersModule { }
