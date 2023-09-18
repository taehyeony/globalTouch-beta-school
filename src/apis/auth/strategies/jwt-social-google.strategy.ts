import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.PASSPORT_OAUTH_GOOGLE_CLEINT_ID,
      clientSecret: process.env.PASSPORT_OAUTH_GOOGLE_CLEINT_SECRET,
      callbackURL: process.env.PASSPORT_OAUTH_GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    return {
      name: profile.displayName,
      email: profile.emails[0].value,
    };
  }
}
