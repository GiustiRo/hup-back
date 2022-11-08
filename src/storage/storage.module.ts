import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import storageConfig from 'src/config/storage.config';
import { StorageService } from './storage/storage.service';

@Module({
  imports: [
    ConfigModule.forFeature(storageConfig),
  ],
  providers: [StorageService],
  exports: [StorageService]
})
export class StorageModule { }
