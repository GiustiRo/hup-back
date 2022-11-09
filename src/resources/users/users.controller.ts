import { Controller, Get, Post, Body, Put, Param, Delete, Headers, UseGuards, Req, UseInterceptors, UploadedFile, HttpService } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthGuard } from '@nestjs/passport';
import { StorageService, StorageBuckets } from 'src/storage/storage/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private storageService: StorageService,
    private http: HttpService
  ) { }

  @UseGuards(AuthGuard('jwt_M2M'))
  @Get('userinfo/:id')
  getUserDetails(@Req() req, @Param() params, @Headers() headers): Observable<any> {
    return this.usersService.findOne(req?.url, { user_id: params?.id }, headers?.authorization).pipe(map(res => res?.data));
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
    try {
      const pic = await this.storageService.save(
        userId,
        file.mimetype,
        file.buffer,
        [{ userId: userId }],
        StorageBuckets.AVATARS
      ).then(async (res) => {
        console.warn(res);
        // Update pic to user profile Auth0 / Mongo.
        let urlPicture = `https://storage.googleapis.com/hup_avatars/${userId}`;
        let urlUpdatePicture = `https://huertup.us.auth0.com/api/v2/users/${userId}`;
        const patchResponse = await this.http.patch(urlUpdatePicture, {
          picture: urlPicture,
        },
          {
            headers: {
              'Authorization': `${headers?.authorization}`
            }
          }).toPromise().then(res => {
            console.warn('patch response:', res);
            return { msg: 'Picture updated successfully!!', urlPicture }
          }).catch(err => {
            return { msg: err.message || 'Error trying to update your picture.' }
          })
        return patchResponse
      }).catch(err => {
        return { msg: 'Error uploading your picture.' }
      });
      // return {
      //   msg: 'Foto subida exitosamente!'
      // }
      return pic
    } catch (error) {
      console.log(error)
      return { msg: error }

    }
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
