import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import authConfig from '../config/auth.config';

import { JwtStrategy_M2M } from './jwt.strategy_m2m';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy_M2M;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(authConfig), PassportModule],
      providers: [JwtStrategy_M2M],
    }).compile();

    jwtStrategy = module.get<JwtStrategy_M2M>(JwtStrategy_M2M);
  });

  describe('validate', () => {
    it('should return the payload for complete authorization scopes', () => {
      const mockPayload = {
        scope: 'email openid profile',
      };

      expect(jwtStrategy.validate(mockPayload)).toBe(mockPayload);
    });

    it('should throw UnauthorizedException for incomplete authorization scopes', () => {
      const mockPayload = {
        scope: 'email madeupscope anothermadeupscope afourthmadeupscope',
      };

      expect(() => jwtStrategy.validate(mockPayload)).toThrow();
    });

    it('should throw UnauthorizedException for empty JWT payloads', () => {
      expect(() => jwtStrategy.validate(null)).toThrow();
      expect(() => jwtStrategy.validate({})).toThrow();
    });
  });
});
