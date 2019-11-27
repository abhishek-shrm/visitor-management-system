var express=require('express');
var router=express.Router();

var checkAuth=require('../check-auth');
var Event=require('../models/events');

//GET events
router.post('/',checkAuth,(req,res)=>{
  //'checkAuth' authenticates the loginToken
  var username=req.body.username;
  Event.find({username:username}).sort({eventSlug:1}).exec((err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
});

//export router
module.exports=router;