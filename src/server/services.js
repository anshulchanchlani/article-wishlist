const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {users} = require('./flat-file/users.json')

passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  
passport.deserializeUser((username, done) => {
    users.forEach((user)=>{
        if(user.username===username){
            done(null,user)
        }
    })
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      let flag=false;

      users.forEach((user)=>{
          if(user.username===username && user.password===password){
              flag=true;
              return done(null,user)
          }
      })
      if(!flag){
          return done({status:403},null)
      }
    }
  ));
