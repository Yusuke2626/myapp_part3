var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
    console.log(req.user);
    res.render('login', {user:req.user});
});
router.post('/', passport.authenticate('local',
  {successRedirect: '/tops',
   failureRedirect: '/meet',
   session: false}
));

// router.post('/signin',
//   passport.authenticate('local',
//     {
//       failureRedirect: "/tops",
//     }
//   ),
//   function(req, res,next){
//     fetch("http://localhost:3000/signin",
//    {
//       credentials: "include"
//    }
//   ).then(function(){
//    res.redirect("/meet");
//   }).catch(function(e){
//    console.log(e);
//   });
  // }
// );




module.exports = router;
