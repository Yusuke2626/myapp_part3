var express = require('express');
var router = express.Router();

var passport = require('passport');

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
/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req.user)
  // if(req.user){
    res.render("index", {});
  // }else{
  //   res.redirect("/signin");
  }
  // res.render('index', {user:req.user});
 
);
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
