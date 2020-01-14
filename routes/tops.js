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

      res.json(req.user);

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
