var express=require('express');
var router=express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

var checkAuth=require('../check-auth');

var Visitor=require('../models/visitors');

//POST add checkout time
router.post('/',checkAuth,(req,res)=>{
  //'checkAuth' authenticates the loginToken
  //find visitor's details by id
  Visitor.findOne({_id:req.body.id},(er,visitorDetails)=>{
    if(er){
      console.log(er);
    }
    if(visitorDetails){
      //update checkout time
      visitorDetails.checkOut=req.body.time;
      //save updates in database
      visitorDetails.save(err=>{
        if(err){
          console.log(err);
        }else{
          //send email to visitor
          const msg = {
            to: visitorDetails.email,
            from: 'abhishek.shrm.2195@gmail.com',
            subject: `VMS-${visitorDetails.event}-Thank you for visiting.`,
            html: `<p>Thank you visiting.</p>
            <p><strong>Name:</strong>${visitorDetails.name}</p>
            <p><strong>Event:</strong>${visitorDetails.event}</p>
            <p><strong>Host Name:</strong>${visitorDetails.host}</p>
            <p><strong>Email:</strong>${visitorDetails.email}</p>
            <p><strong>Phone:</strong>+91${visitorDetails.mobile}</p>
            <p><strong>Check-in Time:</strong>${visitorDetails.checkIn}</p>
            <p><strong>Check-Out Time:</strong>${visitorDetails.checkOut}</p>
            <p><strong>Address Visited:</strong>${visitorDetails.addressVisited}</p>`
          };
          sgMail.send(msg).then(result=>{
            res.sendStatus(200);
          });
        }
      });                
    }
  });
});

//export router
module.exports=router;