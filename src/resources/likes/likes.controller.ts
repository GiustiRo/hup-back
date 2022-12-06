import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {
    console.log('constructor() Likes')
  }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Post('add')
  addLike(@Body() like) {
    return this.likesService.addLike();
  }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Get(':userId/likes')
  findAll(@Param('userId') userId: string) { // Get all user's likes.
    return this.likesService.findAll(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.likesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLikeDto) {
  //   return this.likesService.update(+id, updateLikeDto);
  // }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesService.remove(+id);
  }
}
