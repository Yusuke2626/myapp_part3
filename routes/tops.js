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

///ログインユーザー/////////
  connection.query(`select * FROM users where name LIKE '${req.user.username}';` , function(err,users){
    console.log(users[0])
    var user = users[0];
/////ログインユーザープロフ/////////
    connection.query(`select * FROM userProfile1 where user_id = '${user.id}';` , function(err,profile){
      var profile = profile[0];
      console.log('user_profile', profile)


/////全ユーザー////////////
      connection.query(`select * FROM users;` , function(err,users){
        console.log(users);

  ///全ユーザーの中からいいねしたユーザを除く/////////
        connection.query(`select * FROM likes where user_id = ${user.id};` , function(err,likes){
          console.log('likes');
          console.log(likes[0]);
            var like_users = []

      /////いいねしたユーザー//////////////
          likes.forEach( function (like){
            console.log(like.like_user);
            like_users.push(like.like_user);
          })
   /////////////////////////////////////
          console.log('like_users')
          console.log(like_users);
          like_users.forEach(function (like_user){

            var targetId = like_user
            users.some(function(v, i){
              if (v.id==targetId) users.splice(i,1);
            });
          });
//////全ユーザープロフ/////////
          connection.query(`select * FROM userProfile1;` , function(err,allProfile){
            console.log('user_profile', allProfile)

            var allProfile = allProfile.filter(function(p){
              return p.id !==  profile.id
            })
            var data = [];
            data.push(user);
            data.push(profile);
            data.push(allProfile)
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
