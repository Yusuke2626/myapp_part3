var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp_part2',
})

router.get('/', function(req, res, next) {
  console.log(req.user)
  var name = req.user.username

  ////next users  の削除////////
  connection.query('delete FROM nexts ;' , function(error,nexts){
    if(error) throw error;
    console.log('delete next');
  });

  /////login_user//////////
  console.log(name)
  connection.query(`select * FROM users where name LIKE '${name}';` , function(err,users){

  console.log(users[0])
  var user = users[0];

  ///////LIKES の一致するユーザー////////////
    connection.query(`select * FROM likes where user_id= ${user.id};` , function(err,likes){
      var likeusers_by_loginuser = [];
      likes.forEach( function (like){
        console.log(like.like_user);
        likeusers_by_loginuser.push(like.like_user);
      });
        console.log('likeusers_by_loginuser',likeusers_by_loginuser);

      connection.query(`select * FROM likes where like_user = ${user.id};` , function(err,likes){
        var likeusers_by_other = [];
        likes.forEach( function (like){
          console.log(like.user_id);
          likeusers_by_other.push(like.user_id);
        });
          console.log('likeusers_by_other',likeusers_by_other);

          var meet_people = likeusers_by_loginuser.filter((v) => likeusers_by_other.includes(v))
          console.log('meet_people',meet_people);
          var meet_people = meet_people.join(',');

          console.log('meet_people',meet_people);
          // var a = meet_people.replace('[]','()')
          // console.log('meet_people',a);
  //////////////一致するユーザーをセレクト//////////////////////////////////////////////////////
        connection.query(`select * FROM users where id in (${meet_people});` ,function(err,meet_people){
          console.log('meet_people',meet_people);

  /////user_profileがなければ作成////////////////////
          connection.query(`select * FROM userProfile1 where user_id= ${user.id};` ,function(err,userProfile1){
            if (userProfile1.length !== 0){
              console.log('userProfile1');
              console.log(userProfile1);
              var userProfile1 = userProfile1[0]
            // return res.render("mypage", {user:user,userProfile1:userProfile1,meet_people:meet_people});

            var data = [];
            data.push(user);
            data.push(userProfile1);
            data.push(meet_people);
            
            console.log('data',data);
            return res.json(data);
            }
            else
            {
              var post = {user_id:user.id}
              var sql = `INSERT INTO UserProfile1 SET ?`

              connection.query(sql,post,function(error,results,fields){
                if(error) throw error;
                console.log('else')
                // return res.render("mypage", {user:user,userProfile1:userProfile1,meet_people:meet_people});
                return res.json(user);
              });
            }
          });
        });
      });
    });
  });
});

router.post('/', function(req, res, next){
  console.log('profile_post');
  var area = req.body.area;
  var hobby = req.body.hobby;
  var comment = req.body.comment;

  if (req.body.num_of_people_min !== ''){
    var num_of_people_min = req.body.num_of_people_min;}
  if (req.body.num_of_people_max !== ''){
    var num_of_people_max = req.body.num_of_people_max;}
  if (req.body.expect_area !== ''){
    var expect_area = req.body.expect_area;}
  if (req.body.price_of_rent !==''){
    var price_of_rent = req.body.price_of_rent;}
  if (req.body.user_id !== ''){
    var user_id = req.body.user_id;}

    var post = {area:area,hobby:hobby,num_of_people_min:num_of_people_min,
                num_of_people_max:num_of_people_max,expect_area:expect_area,
                price_of_rent:price_of_rent,comment:comment};


  var sql = `update userProfile1 SET ? where user_id=${user_id}`;

  connection.query(sql,post,function(error,results,fields){
    if(error) throw error;
    res.redirect('/mypage');

  });
});
router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/')
});

router.post('/partner', function(req, res, next) {
  console.log('hello');
  // res.redirect('/')
  res.render("partner", {user:user,partner:partner});
})




module.exports = router;
