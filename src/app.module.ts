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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
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
