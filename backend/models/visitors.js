var mongoose=require('mongoose');

//Event Schema
var VisitorSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    lowercase:true,
  },
  email:{
    type:String,
    required:true,
    lowercase:true
  },
  mobile:{
    type:Number,
    required:true,
    unique:true
  },
  host:{
    type:String,
    required:true
  },
  event:{
    type:String,
    required:true
  },
  eventSlug:{
    type:String,
    required:true,
    lowercase:true
  },
  addressVisited:{
    type:String,
    required:true
  },
  checkIn:{
    type:String,
    required:true
  },
  checkOut:{
    type:String
  }
});

var Visitor=module.exports=mongoose.model('Visitors',VisitorSchema);