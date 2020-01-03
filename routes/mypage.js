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

  console.log(name)
  connection.query(`select * FROM users where name LIKE '${name}';` , function(err,users){

  console.log(users[0])
  var user = users[0];

  return res.render("mypage", {user:user});
  console.log(user)
  });
});

router.post('/',function(req, res, next){
  var area = req.body.area;
  var hobby = req.body.hobby;
  var num_of_people_min = req.body.num_of_people_min;
  var num_of_people_max = req.body.num_of_people_max;
  var expect_area = req.body.expect_area;
  var price_of_rent = req.body.price_of_rent;

  var post = {area:area,hobby:hobby,num_of_people_min:num_of_people_min,
              num_of_people_max:num_of_people_max,expect_area:expect_area,
              price_of_rent:price_of_rent};

  var sql = `INSERT INTO UserProfile1 SET ?`

  connection.query(sql,post,function(error,results,fields){
    if(error) throw error;
    res.redirect('/mypage');

  });
});




module.exports = router;
