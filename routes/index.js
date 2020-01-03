var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp_part2',
})



connection.query('SELECT * from users;',function(err,rows,fields){
  if(err) throw err

  users = rows


})
// router.use(passport.initialize());
// router.use(passport.session());
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  // if(req.user){
    res.render("index", { user : req.user});
  // }else{
  //   res.render("index", {});
  // }
});
  // res.render('index', {user:req.user});
  // router.get('/signin', function(req, res) {
  //     res.render('login', { user : req.user });
  // });

  // router.post('/signin', passport.authenticate('local',
  //     {successRedirect: '/',
  //     failureRedirect: '/signin',
  //     session: true}));

  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

//
// router.get('/signin', function(req, res) {
//   console.log(req.user);
//     res.render('/signin', {user: req.user});
// });
// //
// router.post('/signin', passport.authenticate('local',
//   {successRedirect: '/',
//    failureRedirect: '/signin',
//    session: false}
//  ));
// //
//  router.get('/signout', function(req, res){
//    req.logout();
//   res.redirect('/');
// });

module.exports = router;
