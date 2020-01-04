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

router.get('/', function(req, res, next) {
  console.log(req.user)

  connection.query('delete FROM nexts ;' , function(error,nexts){
    if(error) throw error;
    console.log('delete next');
  });

    res.render("index", { user : req.user});
});


  router.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

module.exports = router;
