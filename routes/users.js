const mongoose=require("mongoose")
const plm=require('passport-local-mongoose')
mongoose.connect("mongodb://localhost/post");
const userSchema= mongoose.Schema({
  name:String,
  username:String,
  password:String,
  usercreated:{
    type:Date,
    default:Date.now()
  },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'posts'
  }]
  
})
userSchema.plugin(plm);

module.exports=mongoose.model('user',userSchema)