const teamRouter=require('express').Router();
const jwt=require('jsonwebtoken');
let Team=require('../models/team.model');
teamRouter.route('/create').post((req,res)=>{
    const teamName=req.body.teamName;
    const createdBy=jwt.verify(req.header('authorization').split(' ')[1],process.env.ACCESS_SECRET_KEY).userID;
    const newTeam=new Team({
        teamName:teamName,
        createdBy:createdBy
    });
    newTeam.save().then((team)=>{
        res.status(201).json('Team '+team.teamName+' created');
    }).catch((e)=>{
        res.status(500).json({
            error:e.toString()
        });
    })
});

module.exports=teamRouter;