const projectRouter=require('express').Router();
const jwt=require('jsonwebtoken');
let Project=require('../models/project.model');
projectRouter.route('/create').post((req,res)=>{
    const projectName=req.body.projectName;
    console.log(req.body);
    const createdBy=jwt.verify(req.header('authorization').split(' ')[1],process.env.ACCESS_SECRET_KEY).userID;
    const newTeam=new Project({
        projectName:projectName,
        manager:req.body.manager
    });
    newTeam.save().then((project)=>{
        res.status(201).json('Project '+project.projectName+' created');
    }).catch((e)=>{
        res.status(500).json({
            error:e.toString()
        });
    })
});
projectRouter.route('/:id').delete((req,res)=>{
    Project.findByIdAndDelete(req.params.id).then(()=>res.status(200).json('Project Deleted'))
    .catch((e)=>res.status(500).json({'error':e.toString()}));
});
projectRouter.route('/').get((req,res)=>{
    Project.find().populate('manager').then((projects)=>{
        res.status(200).json(projects);
    }).catch((e)=>{
        res.status(500).json(e.toString);
    });
});
module.exports=projectRouter;