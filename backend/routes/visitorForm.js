var express=require('express');
var router=express.Router();
const axios=require('axios');
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
        if(er){
          console.log(er);
        }
        if(a){
          // res.send({
          //   success:'You are registered successfully!!'
          // });
          //sending message from 2factor api to host
          axios.post(`https://2factor.in/API/R1/?module=TRANS_SMS&apikey=${process.env.SMS_API_KEY}&to=${a.mobile}&from=VMSVIS&templatename=visitor-management-system&var1=${visitorDetails.event}&var2=${visitorDetails.name}&var3=${visitorDetails.event}&var4=${visitorDetails.email}&var5=${visitorDetails.mobile}&var6=${visitorDetails.checkIn}&var7=${visitorDetails.addressVisited}`).then(resp=>{
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
              }).catch(ers=>{
                console.log(ers);
              });
        }
      });
    }
  });

});

//export router
module.exports=router;