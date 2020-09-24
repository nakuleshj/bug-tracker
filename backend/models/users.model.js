const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    userRole:{
        type:String,
        required:true
    }
},{
    writeConcern: {
        j: true,
        wtimeout: 1000
      },
    timestamps:true
});
const userModel=mongoose.model('users',userSchema);
module.exports=userModel;