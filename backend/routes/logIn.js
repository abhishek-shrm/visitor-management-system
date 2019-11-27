var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var JWT=require('jsonwebtoken');

var Host=require('../models/hosts');

//POST host login
router.post('/',(req,res)=>{
  var username=req.body.username;
  var password=req.body.password;
  //find host by username
  Host.findOne({username:username},(e,host)=>{
    if(e){
      console.log(e);
    }
    if(host){
      //compare password if OK
      bcrypt.compare(password,host.password,(err,result)=>{
        if(err){
          console.log(err);
        }
        if(result){
          //generate token
          const token=JWT.sign({
            email:host.email,
            mobile:host.mobile,
            username:host.username
          },process.env.JWT_SECRET,{
            expiresIn:'12h'
          });
          //send token with host
          res.send({
            username:host.username,
            token:token,
            success:true
          });
        }
        if(!result){
          //if password not equal send error
          res.send({
            errors:'Invalid username or password!!'
          });
        }
      });
    }
    else{
      res.send({
        errors:'Invalid username or password!!'
      });
    }
  });
});

//export router
module.exports=router;