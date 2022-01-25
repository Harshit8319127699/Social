var express = require('express');
var router = express.Router();
const userModel=require('./users');
const postModel=require('./post')
var passport=require('passport');
const localStrategy= require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));


router.get('/', function(req, res, next) {
res.send('logout')
});
router.post('/register', function(req, res) {
  var data = new userModel({
      name: req.body.name,
      username: req.body.name,
  })
  userModel.register(data, req.body.password)
      .then(function(u) {
          passport.authenticate('local')(req, res, function() {
              res.redirect('/profile')
          })
      })
      .catch(function(e) {
          res.send(e);
      })
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/'
}), function(req, res, next) {})

router.get('/profile',function(req,res){
userModel.findOne({
  username:req.session.passport.user
}).then(function(founduser){
  res.send("done")
})
})
router.post('/createpost',function(req,res){
  userModel.findOne({username:req.session.passport.user})
  .then(function(user){
    postModel.create({
      content:req.body.content,
      user:user._id
    })
    .then(function(post){
      user.posts.push(post)
      user.save()
      .then(function(){
        res.send(post)
      })
    })  
  })
  
  
})
router.get("/getallposts",function(req,res){
  userModel.findOne({username:req.session.passport.user})
  .populate({
    path:'user'
  })
  .populate({
    path:'posts'
  })
  .limit(3)
  .then(function(found){
    postModel.find({user:found._id})
    .then(function(posts){
      res.send({posts})
    })
  })
})


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/')
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();

  } else {
      res.redirect('/');
  }

}
module.exports = router;
