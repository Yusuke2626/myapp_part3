var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./public/images/uploads/')
  },
  filename: function(req,file,cb){
    cb(null,file.originalname)
  },
})
var upload = multer({storage:storage});

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myapp_part2',
})

router.get('/', function(req, res, next) {
  res.render('users', {users:users});
});


router.post('/', upload.single('img'), function(req,res,next){
  console.log(req.file);
  console.log('aaaaaaaa');
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var img = ('images/uploads/'+req.file.originalname);


  var post = {name:name,email:email,img:img,password:password};
  var sql = `INSERT INTO users SET ?`;
  console.log(post);

  connection.query(sql,post,function(error,results,fields){

    if(error) throw error;
    res.redirect('/');

  });
});


module.exports = router;
