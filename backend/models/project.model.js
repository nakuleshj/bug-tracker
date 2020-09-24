const mongoose=require('mongoose');
const { type } = require('jquery');
const Schema=mongoose.Schema;
const projectSchema=new Schema(
    {
        projectName:{
            type:String,
            required:true
        },
        members:{
            type:Array
        },
        createdBy:{
            type:String,
            required:true
        },
        manager:{
            type:String,
            required:true,
            trim:true,
            ref:'users'
        }
    },{
        writeConcern: {
            j: true,
            wtimeout: 1000
          },
        timestamps:true
    }
);

const projectModel=mongoose.model('projects',projectSchema);
module.exports=projectModel