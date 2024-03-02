import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import CONFIG from "../../../config/default.js";

export const InitializePassport = (clientID, clientSecret) => {
  const callback_host = CONFIG.HOST_ADDRESS;
  passport.use(
    new GoogleStrategy(
      {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: `${callback_host}/google/callback`,
        passReqToCallback: true,
      },
      async function (request, accessToken, refreshToken, profile, cb) {
        try {
          const data = {
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            email: profile.email,
            id: profile.id,
          };

          return cb(null, data);
        } catch (error) {
          console.log(error);
          return cb(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log("====serializeUser======",user);
    done(null, user);
  });
  
  passport.deserializeUser(async(user, done) => {
    console.log("====DeserializeUser======",user);
    done(null, user);
  });
};
