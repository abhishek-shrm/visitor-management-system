var mongoose=require('mongoose');

//Host Schema
var HostSchema=mongoose.Schema({
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true
  },
  mobile:{
    type:Number,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
});

var Host=module.exports=mongoose.model('Hosts',HostSchema);