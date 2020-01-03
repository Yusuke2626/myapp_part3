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
  console.log(req.user)
  var name =  req.user.username;

  connection.query(`select * FROM users where name LIKE '${name}';` , function(err,users){

  console.log(users[0])
  var user = users[0];

    connection.query(`select * FROM users;` , function(err,users){
      console.log(users);

      var targetId = user.id
      users.some(function(v, i){
        if (v.id==targetId) users.splice(i,1);
      });

      console.log(users);
      return res.render('meet',{ users : users, user : user});

    });
  });
});

module.exports = router;
