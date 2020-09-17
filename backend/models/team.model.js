const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const teamSchema=new Schema(
    {
        teamName:{
            type:String,
            required:true
        },
        members:{
            type:Array
        },
        createdBy:{
            type:String,
            required:true
        }
    },{
        writeConcern: {
            j: true,
            wtimeout: 1000
          },
        timestamps:true
    }
);

const teamModel=mongoose.model('teams',teamSchema);
module.exports=teamModel