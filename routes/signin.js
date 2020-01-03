var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');


router.get('/', function(req, res, next) {
    console.log(req.user);
    res.render('login', {user:req.user});
});
router.post('/', passport.authenticate('local',
    {successRedirect: '/',
    failureRedirect: '/signin',
    session: true}));


module.exports = router;
