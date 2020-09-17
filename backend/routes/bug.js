const bugRouter=require('express').Router();
const jwt=require('jsonwebtoken');
let Bug=require('../models/bug.model');

bugRouter.route('/report').post((req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const reportedBy=jwt.verify(req.header('authorization').split(' ')[1],process.env.ACCESS_SECRET_KEY).userID;
    const newBug=new Bug({
        title:title,
        description:description,
        isFixed:false,
        reportedBy:reportedBy
    });
    newBug.save().then((bug)=>{
        res.status(201).json({'status':bug._id+' reported by '+bug.reportedBy+ ' recorded'});
    });
});
bugRouter.route('/:id').get((req,res)=>{
    Bug.findById(req.params.id).then((bug)=>{
        res.status(200).json({'title': bug.title,'description':bug.description,'isFixed':bug.isFixed,'reportedBy':bug.reportedBy});
    }).catch((e)=>{
        res.status(500).json({
            error:e.toString()
        });
    });
});
bugRouter.route('/fixed').post((req,res)=>{
    // jwt.verify(req.header('authorization').split(' ')[1];
    Bug.findByIdAndUpdate(req.body.bugID,{
        isFixed:true
    }).then((bug)=>{
        res.status(201).json({'status':'Bug Fixed'+bug.isFixed});
    }).catch((e)=>{
        res.status(500).json({
            error:e.toString()
        });
    });
});

module.exports=bugRouter;