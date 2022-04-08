const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!

// configuring Passport!
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }, function(accessToken, refreshToken, profile, done) {
    // console.log(profile)
    // console.log('this profile ^ from google')

    User.findOne({googleId: profile.id}, function(err, user){
      if(user) return done(null, user);
      if(err) return done(err)

      User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value
      }, function(err, createdUser){
        if(createdUser) return done(null, createdUser)
        if(err) return done(err)
      })
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    if(err) return done(err);
    done(null, user);
  })
});



