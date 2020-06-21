const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const keys =require('../config/keys').secretOrKey;
const users= require('mongoose').model('users');


const opts = {
  jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : keys
};


const strategy = new jwtStrategy(opts, (jwt_payload,done)=>{

  users.findById(jwt_payload.id)
      .then( user => {
        if (user)
        {
          return done(null, user);
        }
        return done(null , false);
      })
      .catch( err =>  done(err, null));
});

module.exports = (passport) =>{

  passport.use(strategy);
}
