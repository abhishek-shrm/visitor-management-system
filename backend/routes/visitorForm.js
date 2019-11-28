var express=require('express');
var router=express.Router();
const client=require('twilio')(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var Visitor=require('../models/visitors');
var Host=require('../models/hosts');

//POST visitor form
router.post('/',(req,res)=>{
  //create object of visitor details
  var visitorDetails=new Visitor({
    name:req.body.name,
    username:req.body.username,
    email:req.body.email,
    mobile:req.body.mobile,
    host:req.body.host,
    event:req.body.event,
    eventSlug:req.body.eventSlug,
    addressVisited:req.body.addressVisited,
    checkIn:req.body.checkIn,
    checkOut:null
  });

  //save visitor details into database
  visitorDetails.save(e=>{
    if(e){
      console.log(e);
    }else{
      Host.findOne({username:visitorDetails.username},(er,a)=>{
        var sms=`VMS-${visitorDetails.event}-New visitor
Name:${visitorDetails.name}
Event:${visitorDetails.event}
Email:${visitorDetails.email}
Phone:+91 ${visitorDetails.mobile}
Check-in Time:${visitorDetails.checkIn}
Address Visited:${visitorDetails.addressVisited}`;
        if(er){
          console.log(er);
        }
        if(a){
          //sending message from twilio to host
          client.messages.create({
            to:'+91'+a.mobile,
            from:'+17748547026',
            body:sms
          }).then(message=>{
            if(message.sid){
              const msg = {
                to: a.email,
                from: 'abhishek.shrm.2195@gmail.com',
                subject: `VMS-${visitorDetails.event}-New visitor`,
                html: `<p><strong>Name:</strong>${visitorDetails.name}</p>
                <p><strong>Event:</strong>${visitorDetails.event}</p>
                <p><strong>Email:</strong>${visitorDetails.email}</p>
                <p><strong>Phone:</strong>+91${visitorDetails.mobile}</p>
                <p><strong>Check-in Time:</strong>${visitorDetails.checkIn}</p>
                <p><strong>Address Visited:</strong>${visitorDetails.addressVisited}</p>`
              };
              sgMail.send(msg).then(result=>{
                res.send({
                  success:'You are registered successfully!!'
                });
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