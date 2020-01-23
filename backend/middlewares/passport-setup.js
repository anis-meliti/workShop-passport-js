const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');
const secretKey = config.get('secretKey');

const User = require('../models/User');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
};
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const searchRes = await User.findById(jwt_payload.id);
        console.log('TCL: searchRes', searchRes);

        // if (searchRes) return done(null, searchRes);
        // return done(null, false);
        searchRes ? done(null, searchRes) : done(null, error);
      } catch (error) {
        console.error(error);
      }
    })
  );
};
