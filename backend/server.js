const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const path = require('path')
const mongoose=require('mongoose');
const cors=require('cors');
const port=process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();
const authenticationRouter=require('./routes/authentication');
const bugRouter=require('./routes/bug');
const projectRouter=require('./routes/project');
app.use('/authenticate',authenticationRouter);
app.use('/bug',bugRouter);
app.use('/project',projectRouter);
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology: true});
// const excercisesRouter=require('./routes/exercises');
app.listen(port,()=>{
    console.log('Server running on port: '+port);
});