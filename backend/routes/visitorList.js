var express=require('express');
var router=express.Router();

var checkAuth=require('../check-auth');
var Visitor=require('../models/visitors');

//GET visitors for event
router.post('/',checkAuth,(req,res)=>{
  //'checkAuth' authenticates the loginToken
  var slug=req.body.eventSlug;
  var username=req.body.username;
  Visitor.find({$and:[{eventSlug:slug},{username:username}]}).sort({checkIn:1}).exec((err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });
});


//export router
module.exports=router;