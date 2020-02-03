var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'myapp_part2',
})

router.get('/', function(req, res, next) {
  console.log(req.user);

  connection.query(`select * FROM users where name LIKE '${req.user.username}';` , function(err,users){
    console.log(users[0])
    var user = users[0];

    connection.query(`select * FROM userProfile1 where user_id = '${user.id}';` , function(err,profile){
      var profile = profile[0];
      console.log('user_profile', profile)

      connection.query(`select * FROM users;` , function(err,users){
        console.log(users);

        var data = [];
        data.push(user);
        data.push(profile);
        users.forEach(function(user){
          data.push(user)
          console.log(data);
        });  

        console.log('userdata', data);
        res.json(data);
      });
    });
  });
});

// router.get('/', function(req, res, next) {
//   console.log(req.user);
//   connection.query("select * from users LIMIT 0, 10", function(error,users){
//     if (error) throw error;
//     connection.query("select * from likes LIMIT 0, 10", function(error,likes){
//       if (error) throw error;
//       likes.forEach(function(like){
//         users.push(like)
//         console.log(like);
//       });
//       var data = users
//       res.json(data);
//
//     });
//   });
// });

module.exports = router;
