var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topsRouter = require('./routes/tops');
var newRouter = require     ('./routes/new');
var matchingRouter = require('./routes/meet');
var mypageRouter = require     ('./routes/mypage');
// var new_profileRouter = require('./routes/new_profile');
var signinRouter = require('./routes/signin');
var partnerRouter = require('./routes/partner');

var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp_part2',
});

app.use(session({ resave:false,saveUninitialized:false, secret: 'passport test' }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: true,
      },
      function(req, username, password, done){
        process.nextTick(function(){
        connection.query('select * FROM users;', function(err,users){
          console.log(users)
          var usernames = [];
          var passwords = [];
          console.log('aa');
          for(i = 0; i < users.length; i++){
            usernames.push(users[i].name);
          console.log('bb');
          console.log(username);
          var pw = users[i].password.toString();
          passwords.push(pw);
          console.log('cc');
          console.log(pw);
          }
          if (usernames.includes(username) && passwords.includes(password)) {
            console.log('ユーザーIDが正しくありません。' );
          return done(null, {username:username, password:password});
          }
          else{
              console.log('パスワードが正しくありません。' );
            return done(null, false, { message: 'パスワードが正しくありません。' });
          }
        })
      })
}));

passport.serializeUser(function(user, done){
  console.log('serialize.........')
  done(null, user);
  console.log(user);
});
passport.deserializeUser(function(user, done){
  console.log('deserialize.........')
  done(null, user);
  console.log(user);
});


app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use('/tops', topsRouter);
app.use('/new', newRouter);
app.use('/meet',matchingRouter);
app.use('/mypage', mypageRouter);
// app.use('/user/new_profile', usersRouter);
app.use('/signin', signinRouter);
app.use('/partner', partnerRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
