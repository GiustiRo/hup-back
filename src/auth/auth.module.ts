import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import authConfig from '../config/auth.config';
import { AuthGuard_AUTH, AuthGuard_M2M } from './authGuards';

import { JwtStrategy_AUTH } from './jwt.strategy_auth';
import { JwtStrategy_M2M } from './jwt.strategy_m2m';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy_M2M, JwtStrategy_AUTH],
  exports: [PassportModule, JwtStrategy_M2M, JwtStrategy_AUTH],
})
export class AuthModule { }
