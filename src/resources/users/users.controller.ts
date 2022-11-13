import { Controller, Get, Post, Body, Put, Param, Delete, Headers, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthGuard } from '@nestjs/passport';
import { StorageService, StorageBuckets } from 'src/storage/storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { HttpService } from '@nestjs/axios';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(AuthGuard('jwt_M2M'))
  @Get('userinfo/:id')
  getUserDetails(@Req() req, @Param() params, @Headers() headers): Observable<any> {
    // return this.usersService.findOne(req?.url, { user_id: params?.id }, headers?.authorization).pipe(map(res => res?.data));
    return of(this.usersService.findOne(req?.url, { user_id: params?.id }, headers?.authorization));
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Upload file to GCS (then use url to update user details).
  @UseGuards(AuthGuard('jwt_M2M'))
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
    })
  )
  @Post('profile-picture')
  async uploadMedia(
    @UploadedFile() file: Express.Multer.File,
    @Body("userId") userId: string,
    @Headers() headers
  ) {
    return of(this.usersService.updatePicture(file, userId, headers))
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
