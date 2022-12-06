import { Controller, Get, UseGuards, Post, Body, Headers, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard_M2M } from './auth/authGuards';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /* Access Token will be requested once there is an user authenticated on the client side. */
  @Post('hupm2m')
  authenticateUser(@Body() reqAuth: any): Observable<any> {
    return this.appService.authenticate().pipe(map(res => res?.data));
  }

  @UseGuards(AuthGuard('jwt_AUTH'))
  @Get('protected_M2M')
  getProtectedM2M(): Object {
    return { message: 'This route is protected M2M.' };
  }

}
