import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {
    console.log('constructor() Likes')
  }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Get('')
  findAll(@Req() req) { // Get all user's likes.
    return this.likesService.findAll(req.user?.sub);
  }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Post('like')
  addLike(@Req() req, @Body() like) {
    console.warn(req.user);
    return this.likesService.addLike(like, req.user?.sub);
  }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Put(':id')
  update(@Param('id') id: string, @Body() body, @Req() req) {
    console.warn(id, body, req.user?.sub);

    return this.likesService.update(id, body, req.user?.sub);
  }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.likesService.remove(id, req.user?.sub);
  }
}
