import { Controller, Get, Post, Body, Put, Param, Delete, Headers, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDocument } from 'src/mongo/schemas/users/user.schema';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Get('userinfo')
  getUserDetails(@Req() req): Observable<any> {
    return of(this.usersService.findOne(req?.user.sub));
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Put('update')
  update(@Body() updateUserDto: Partial<UserDocument>) {
    return of(this.usersService.update(updateUserDto));
  }

  // Upload file to GCS (then use url to update user details).
  @UseGuards(AuthGuard('jwt_AUTH'))
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    })
  )
  @Post('profile-picture')
  async uploadMedia(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return of(this.usersService.updatePicture(file, req?.user?.sub))
  }

  // This controller will not Create/Delete users for now => Auth0 Server does.
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
