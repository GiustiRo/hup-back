import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as BaseStrategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class JwtStrategy_AUTH extends PassportStrategy(BaseStrategy, 'jwt_AUTH') {

  constructor(configService: ConfigService) {
    console.warn('constructor() AUTH');

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get<string>(
          'auth.domain',
        )}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: 'http://localhost:3000/',
      // audience: configService.get<string>('auth.audience_AUTH_API'),
      issuer: `https://${configService.get<string>('auth.domain')}/`,
      // issuer: `http://localhost:3000`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    console.warn('AUTH payload: ', payload);


    // const minimumScope = ['read:users', 'update:users'];
    // if (
    //   payload?.scope
    //     ?.split(' ')
    //     .filter((scope) => minimumScope.indexOf(scope) > -1).length < minimumScope.length
    // ) {
    //   throw new UnauthorizedException(
    //     `JWT does not possess the required scope ('read:users, update:users').
    //     `,
    //   );
    // }
    return payload;
  }
}
