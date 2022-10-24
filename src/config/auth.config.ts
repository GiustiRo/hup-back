import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  domain: process.env.AUTH0_DOMAIN,
  // M2M
  clientId_M2M: process.env.AUTH0_CLIENT_ID_M2M,
  clientSecret_M2M: process.env.AUTH0_CLIENT_SECRET_M2M,

  // SPA
  clientId_AUTH: process.env.AUTH0_CLIENT_ID_AUTH,
  clientSecret_AUTH: process.env.AUTH0_CLIENT_SECRET_AUTH,

  // APIs
  audience_MGMT_API: process.env.AUTH0_AUDIENCE_MGMT_API,
  audience_AUTH_API: process.env.AUTH0_AUDIENCE_AUTH_API,
}));
