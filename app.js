var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topsRouter = require('./routes/tops');
var newRouter = require     ('./routes/new');
var matchingRouter = require('./routes/meet');
var profileRouter = require('./routes/profile');

//
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var fetch = require('isomorphic-fetch');

var signinRouter = require('./routes/signin');
app.use('/signin',signinRouter);

app.use(session({
  secret: "testing",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(username, done){
  console.log('serializeUser');
  done(null, username);
});

passport.deserializeUser(function(username, done){
  console.log('serializeUser');
  done(null,{name:username});
})

passport.use(new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  function(username, password, done){
    if(username == "test" && password ==1234){
      return done(null, username);
    }
    return done(null, false, {message: "invalid"});
  }
));
// app.post('/signin',
//   passport.authenticate('local',
//     {
//       failureRedirect: "/meet",
//     }
//   ),
//   function(req, res,next){
//     fetch("http://localhost:3000/signin",
//    {
//       credentials: "include"
//    }
//   ).then(function(){
//    res.redirect("/");
//   }).catch(function(e){
//    console.log(e);
//   });
//   }
// );
// app.post('/signin', passport.authenticate('local',
//   {successRedirect: '/tops',
//    failureRedirect: '/meet',
//    session: false}
// ));

// var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public/images/', express.static(__dirname + '/public/images/'));

// app.use(passport.initialize());
// // app.use(passport.session());
// var LocalStrategy = require('passport-local').Strategy;
// passport.use(new LocalStrategy({
//   usernameField: 'username',
//   passwordField: 'password',
//   passReqToCallback: true,
//   session: false,
// }, function (req, username, password, done){
//   process.nextTick(function() {
//     if(username === "test" && password === "test"){
//       return done(null, username)
//     }else{
//       console.log('login error')
//       return done(null, false, {message:'not collect password'})
//     }
//   })
// }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tops', topsRouter);
app.use('/new', newRouter);
app.use('/meet', matchingRouter);
app.use('/profile', profileRouter);




// app.use(session({
//
//   secret: "testing",
//   resave: false,
//   saveUninitialized: true
// }));
//
//
// passport.serializeUser(function(username, done){
//   console.log('serializeUser');
//   done(null, username);
// });
// passport.deserializeUser(function(username, done){
//   console.log('deserializeUser');
//   done(null, {name:username});
// });
//
// passport.use(new LocalStrategy(
//   {
//   usernameField: "username",
//   passwordField: "password"
//   },
//   function(username,password,done){
//     if( username == "test" && password == 1234){
//       return done(null,username);
//     }
//     return done(null,false,{message:"invalid"});
//   }
// ));
// app.post('/signin',
//   passport.authenticate('local',
//   {
//     failureRedirect:"/signin"
//   }
// ),
// function(req,res,next){
//   fetch("http://localhost:3000/signin",
//   {
//     credentials: "include"
//   }
// ).then(function(){
//   res.redirect("/");
// }).catch(function(e){
//   console.log(e);
// });
// }
// );


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
