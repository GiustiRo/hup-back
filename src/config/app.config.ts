import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT ?? 8080,
  host: process.env.HOST ?? '0.0.0.0',
}));
