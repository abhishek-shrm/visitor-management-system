var express=require('express');
var router=express.Router();
var checkAuth=require('../check-auth');

var Host=require('../models/hosts');
var Event=require('../models/events');

//POST create event
router.post('/',checkAuth,(req,res)=>{
  //'checkAuth' authenticates the loginToken
  var username=req.body.username;
  var eventName=req.body.eventName;
  var eventSlug=eventName.replace(/\s+/g,'-').toLowerCase();
  var venue=req.body.venue;

  //find if host has already created this event
  Event.findOne({$and:[{username:username},{eventSlug:eventSlug}]},(er,existEvent)=>{
    if(er){
      console.log(er);
    }
    if(existEvent){
      res.send({
        errors:'Event already exists!!'
      });
    }
    if(!existEvent){
      //find host with username
      Host.findOne({username:username},(e,host)=>{
        if(e){
          console.log(e);
        }
        if(host){
          var hostName=host.firstName+' '+host.lastName;
          var event=new Event({
            hostName:hostName,
            username:username,
            eventName:eventName,
            eventSlug:eventSlug,
            venue:venue
          });
          event.save(err=>{
            if(err){
              console.log(err);
            }else{
              res.send({
                success:'Event added successfully'
              });
            }
          });
        }
      });
    }
  });
});

//export router
module.exports=router;