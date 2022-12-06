import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule { }
