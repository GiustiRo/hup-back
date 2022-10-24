import { Controller, Get, Post, Body, Put, Param, Delete, Headers, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
