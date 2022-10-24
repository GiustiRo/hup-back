import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService]
})
export class UsersModule { }
