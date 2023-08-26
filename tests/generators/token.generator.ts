import createJWKSMock, { JWKSMock } from "mock-jwks";
import { Role } from "../../src/auth/role";
import { UserId } from "../../src/utils/schemas/user.id";
import { appConfig } from "../../src/config/app.config";

export const DEFAULT_TEST_EMAIL = "test@arc.it";
export const DEFAULT_TEST_NICKNAME = "Nickname";
export const DEFAULT_TEST_NAME = "Name";
export const DEFAULT_TEST_IS_EMAIL_VERIFIED = true;
export const DEFAULT_TEST_USER_ROLES = [Role.USER];
export const DEFAULT_USER_ID = "super-random-id" as UserId;

export const startJwksMock = () => {
  const jwksMock: JWKSMock = createJWKSMock(appConfig.AUTH0_ISSUER_BASE_URL);
  jwksMock.start();
  return jwksMock;
};

export const generateJwtToken = (jwksMock: JWKSMock, tokenClaims?: TestTokenClaims, customUserId?: string) => {
  const claims: TestTokenClaims = TestTokenClaimsDefaults;
  const now: Date = new Date();
  const tokenExpirationInMin = 10;

  if (tokenClaims) {
    Object.keys(claims).forEach(key => {
      if (JSON.stringify(tokenClaims[key])) {
        claims[key] = tokenClaims[key];
      }
    });
  }

  return jwksMock.token({
    "sub": `auth0|${customUserId || DEFAULT_USER_ID}`,
    "aud": appConfig.AUTH0_CLIENT_ID,
    "iss": appConfig.AUTH0_ISSUER_BASE_URL,
    [appConfig.AUTH0_APP_METADATA_CLAIM]: {
      "roles": DEFAULT_TEST_USER_ROLES,
    },
    "nickname": claims.nickname,
    "name": claims.name,
    "email": claims.email,
    "email_verified": claims.isEmailVerified,
    "iat": Math.floor(now.getTime() / 1000),
    "exp": Math.floor(new Date(now.getTime() + (tokenExpirationInMin * 60000)).getTime() / 1000)
  });
};

export const generateAuthorization = (jwksMock: JWKSMock, customUserId?: string, tokenClaims?: TestTokenClaims) => {
  return `Bearer ${generateJwtToken(jwksMock, tokenClaims, customUserId)}`;
};

export const stopJwksMock = (jwksMock: JWKSMock) => {
  return jwksMock.stop();
};

export interface TestTokenClaims {
  roles?: Role[],
  email?: string,
  isEmailVerified?: boolean,
  nickname?: string,
  name?: string,
}

const TestTokenClaimsDefaults: TestTokenClaims = {
  roles: DEFAULT_TEST_USER_ROLES,
  email: DEFAULT_TEST_EMAIL,
  isEmailVerified: DEFAULT_TEST_IS_EMAIL_VERIFIED,
  nickname: DEFAULT_TEST_NICKNAME,
  name: DEFAULT_TEST_NAME,
};
