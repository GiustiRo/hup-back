import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resources/users/users.module';
import { StorageModule } from './storage/storage.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTIONS, MONGO_CREDS, MONGO_DATABASE } from './mongo/connections/mongo-connections.interface';
import { PlantsModule } from './resources/plants/plants.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    MongooseModule.forRoot(`mongodb+srv://admin:admin@hupdb.joxwxcu.mongodb.net/${MONGO_DATABASE.MAIN}?retryWrites=true&w=majority`, {
      connectionName: MONGO_CONNECTIONS.USERS,
    }),
    MongooseModule.forRoot(`mongodb+srv://admin:admin@hupdb.joxwxcu.mongodb.net/${MONGO_DATABASE.MAIN}?retryWrites=true&w=majority`, {
      connectionName: MONGO_CONNECTIONS.PLANTS,
    }),
    AuthModule,
    HttpModule,
    UsersModule,
    StorageModule,
    PlantsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }