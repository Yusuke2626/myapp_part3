var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp_part2',
})

router.post('/', function(req, res, next) {
  console.log('hello');
  console.log(req.user)
  var name = req.user.username
  var partner_id = req.body.user_id;
  var message = req.body.text

  if (message){
    console.log('message');
    connection.query(`select * FROM users where name LIKE '${name}';` , function(err,users){
      console.log(users[0])
      var user = users[0];
      var post = {user_id:user.id, content:message};
      var sql = `INSERT INTO messages SET ?`;
      connection.query(sql,post,function(error,results,fields){
        if(error) throw error;
      })
      connection.query(`select * FROM users where id = '${partner_id}';` , function(err,users){
        var partner = users[0];
        connection.query(`select * FROM userProfile1 where user_id = '${partner_id}';` , function(err,profile){
          var profile = profile[0];
          connection.query(`select * FROM messages where user_id = '${user.id}' or '${partner_id}' ORDER by id DESC;` , function(err,messages){
            var messages = messages
            console.log('messages',messages)

            res.render('partner',{user:user, partner:partner, profile:profile, messages:messages})

          })
        })
      })
    })
  }else{
    connection.query(`select * FROM users where name LIKE '${name}';` , function(err,users){
      console.log(users[0])
      var user = users[0];

      connection.query(`select * FROM users where id = '${partner_id}';` , function(err,users){
        var partner = users[0];
        connection.query(`select * FROM userProfile1 where user_id = '${partner_id}';` , function(err,profile){
          var profile = profile[0];
          connection.query(`select * FROM userProfile1 where user_id = '${partner_id}';` , function(err,profile){
            var profile = profile[0];
            connection.query(`select * FROM messages where user_id = ${user.id} or ${partner_id} ORDER by id DESC;` , function(err,messages){
              var messages = messages
              console.log(user.id);
              console.log(partner_id);
              console.log('messages',messages)
              res.render("partner", {user:user, partner:partner, profile:profile, messages:messages});
            });

          });
        });
      });
    });
  }
})

module.exports = router;
