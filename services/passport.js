const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model("users");

// The user argument is provided by the second argument in the done function. 
// The first argument of done is a possible error, hence the null when everything works fine
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try{
    user = await User.findById(id);
    if(user){
      done(null, user); // passport attaches this user to the req.user along with a few methods to manipulate it, for example req.logout
    } else {
      done("The mummy has rotted");
    }
  } catch(e) {
    console.log(e);
    done("Error")
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true // To deal with the heroku since it uses a proxy
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        existingUser = await User.findOne({ googleId: profile.id });
        if(existingUser){
          done(null, existingUser);
        } else {
          user = await new User({ googleId: profile.id }).save();
          if(user){
            done(null, user);
          }
        }
      } catch(e){
        console.log(e);
        done("Error");
      }
    }
  )
);
