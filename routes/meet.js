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

///loginユーザー/////////
  connection.query(`select * FROM users where name LIKE '${name}';` , function(err,users){

  console.log(users[0])
  var user = users[0];

///ログインユーザー以外の全ユーザー/////////
    connection.query(`select * FROM users;` , function(err,users){
      console.log(users);

      var targetId = user.id
      users.some(function(v, i){
        if (v.id==targetId) users.splice(i,1);
      });

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

///全ユーザーの中からnextしたユーザを除く/////////
        connection.query(`select * FROM nexts where user_id = ${user.id};` , function(err,nexts){
          console.log('next');
          console.log(nexts[0]);

          var next_users = []
          nexts.forEach( function (next){
            console.log(next.next_user);
            next_users.push(next.next_user);
          });

          next_users.forEach(function (next_user){

            var targetId = next_user
            users.some(function(v, i){
              if (v.id==targetId) users.splice(i,1);
            });
          });

          console.log(users);
          return res.render('meet',{ users : users, user : user});

        });
      });
    });
  });
});

router.post('/like',function(req,res,next){
  console.log(req.user)
  var name = req.user.username;

  connection.query(`select * FROM users where name LIKE '${name}';` , function(err,users){

    var user = users[0];

    console.log('current_user');
    console.log(user);

    var user_id = user.id;
    var like_user =  req.body['like_user_id'];

    var post = {user_id:user_id,like_user:like_user};
    var sql = `INSERT INTO likes SET ?`;


    console.log('like_user');
    console.log(like_user);

    connection.query(sql, post, function(err,results,fields){

      console.log(sql);
      console.log(post);

      if(err) throw error;

    });
    return res.redirect('/meet');
  });
});


router.post('/next',function(req,res,next){
  console.log('next')
  console.log(req.user)
  var name = req.user.username;

  connection.query(`select * FROM users where name LIKE '${name}';` , function(err,users){

    var user = users[0];

    console.log('current_user');
    console.log(user);

    var user_id = user.id;
    var next_user =  req.body['next_user_id'];

    var post = {user_id:user_id,next_user:next_user};
    var sql = `INSERT INTO nexts SET ?`;


    console.log('next_user');
    console.log(next_user);

    connection.query(sql, post, function(err,results,fields){

      console.log(sql);
      console.log(post);

      if(err) throw err;

    });
    return res.redirect('/meet');
  });
});



module.exports = router;
