var mongoose=require('mongoose');

//Event Schema
var EventSchema=mongoose.Schema({
  hostName:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    lowercase:true,
  },
  eventName:{
    type:String,
    required:true
  },
  eventSlug:{
    type:String,
    required:true,
    lowercase:true
  },
  venue:{
    type:String,
    required:true
  }
});

var Event=module.exports=mongoose.model('Events',EventSchema);