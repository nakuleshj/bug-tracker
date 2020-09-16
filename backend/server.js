const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const port=process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();
const authenticationRouter=require('./routes/authentication');
app.use('/authenticate',authenticationRouter);
const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true});
// const excercisesRouter=require('./routes/exercises');
app.listen(port,()=>{
    console.log('Server running on port: '+port);
});