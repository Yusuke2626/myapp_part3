var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'myapp_part2',
})

connection.query('SELECT * from users;',function(err,rows,fields){
  if(err) throw err
  users = rows
})


router.get('/',function(req,res,next){
  res.render('meet',{users:users});

});
module.exports = router;
