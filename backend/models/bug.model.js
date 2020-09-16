const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bugSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isFixed:{
        type:Boolean,
    },
    reportedBy:{
        type:String,
        required:true,
        trim:true
    }
},{
    writeConcern: {
        j: true,
        wtimeout: 1000
      },
    timestamps:true
});

const bugModel=mongoose.model('bugs',bugSchema);
module.exports=bugModel;