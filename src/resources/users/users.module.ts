import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StorageService } from 'src/storage/storage/storage.service';
import storageConfig from 'src/config/storage.config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forFeature(storageConfig),
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService, StorageService]
})
export class UsersModule { }
