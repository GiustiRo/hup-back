import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { StorageModule } from './storage/storage.module';
import { MediaModule } from './resources/media/media.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTIONS, MONGO_CREDS } from './mongo/connections/mongo-connections.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    MongooseModule.forRoot(`mongodb+srv://admin:admin@hupdb.joxwxcu.mongodb.net/hupDB?retryWrites=true&w=majority`, {
      connectionName: MONGO_CONNECTIONS.USERS,
    }),
    AuthModule,
    HttpModule,
    UsersModule,
    StorageModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }