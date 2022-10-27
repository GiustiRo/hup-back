import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as BaseStrategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class JwtStrategy_M2M extends PassportStrategy(BaseStrategy, 'jwt_M2M') {
  constructor(configService: ConfigService) {
    console.warn('constructor() M2M');

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
      audience: `${configService.get<string>('auth.audience_MGMT_API')}/`,
      issuer: `https://${configService.get<string>('auth.domain')}/`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    console.warn('M2M payload: ', payload);

    const minimumScope = ['read:users', 'update:users'];
    if (
      payload?.scope
        ?.split(' ')
        .filter((scope) => minimumScope.indexOf(scope) > -1).length < minimumScope.length
    ) {
      throw new UnauthorizedException(
        `JWT does not possess the required scope ('read:users, update:users').
        `,
      );
    }
    return payload;
  }
}