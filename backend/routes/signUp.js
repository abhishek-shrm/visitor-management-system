var express=require('express');
var router=express.Router();
var bcrypt=require('bcryptjs');
var JWT=require('jsonwebtoken');

var Host=require('../models/hosts');

// POST register host
router.post('/',(req,res)=>{
  var username=req.body.username;
  var firstName=req.body.firstName;
  var lastName=req.body.lastName;
  var email=req.body.email;
  var mobile=req.body.mobile;
  var password=req.body.password;

  //checks if username already exists
  Host.findOne({username:username},(e,a)=>{
    // 'a' is the existing user with username and 'e' is the error
    if(e){
      console.log(e);
    }
    if(a){
      res.send({
        errors:'Username already exists!'
      });
    }
    else{
      //checks if email already exists
      Host.findOne({email:email},(er,b)=>{
        // 'b' is the existing user with email and 'er' is the error
        if(er){
          console.log(er);
        }if(b){
          res.send({
            errors:'Email already exists!'
          });
        }else{
          //checks if mobile already exists
          Host.findOne({mobile:mobile},(err,c)=>{
            // 'c' is the existing user with mobile and 'err' is the error
            if(err){
              console.log(err);
            }if(c){
              res.send({
                errors:'Mobile already exists!'
              });
            }else{
              //hash the password
              bcrypt.hash(password,10,(bcryptError,hash)=>{
                if(bcryptError){
                  console.log(bcryptError);
                }
                else{
                  //create host object
                  var host=new Host({
                    firstName:firstName,
                    lastName:lastName,
                    username:username,
                    email:email,
                    mobile:mobile,
                    password:hash
                  });
                  //save the host in the database
                  host.save(error=>{
                    if(error){
                      console.log(error);
                    }
                    else{
                      res.send({
                        success:'You are registered successfully!!'
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

//Exports
module.exports=router;