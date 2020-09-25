const authenticationRouter=require('express').Router();
const jwt=require('jsonwebtoken');
const bCrypt=require('bcrypt');
let User=require('../models/users.model');
authenticationRouter.route('/login').post(async (req,res)=>{
    try{
        let f=false;
        User.find({email:req.body.email}).then(user=>{
            if(user.length===0)
            console.log('empty')})
        const allUsers=await User.find();
        allUsers.forEach(async(user)=>{
            if(user.email===req.body.email)
            {
                f=true;
                if(await bCrypt.compare(req.body.password,user.password))
                res.status(200).json({
                    'token':jwt.sign({'userID':user._id},process.env.ACCESS_SECRET_KEY),
                    'role':user.userRole
                });
            }
        });
        if(!f)
        res.status(401).json({'status':'Email/Password is Incorrect'});
    }catch(e){
        res.status(500).json({
            error:e.toString()
        });
    }
});
authenticationRouter.route('/').get((req,res)=>{
    User.find().then(users=>res.json(users)).catch(e=>res.status(500))
});
authenticationRouter.route('/disable/:id').post((req,res)=>{
    User.findByIdAndUpdate(req.params.id,{isDisabled:true}).then((user)=>{
        res.status(200).json({message:'User Disabled'})
    }).catch((e)=>{
        res.status(500).json({message:e.toString()})
    })
});
authenticationRouter.route('/resetPassword/:id').post(async (req,res)=>{
    const hashedPassword=await bCrypt.hash(req.body.newPassword,10);
    User.findByIdAndUpdate(req.params.id,{password:hashedPassword,})
    .then((user)=>res.status(200).json({'message':'Password Updated'}))
    .catch((e)=>res.status(500).json({message:e.toString()}));
});
authenticationRouter.route('/register').post(async (req,res)=>{
    try{
        const email=req.body.email;
        const name=req.body.name;
        const userRole=req.body.userRole;
        const hashedPassword=await bCrypt.hash(req.body.password,10);
        const newUser=new User({
            email:email,
            name:name,
            password:hashedPassword,
            userRole:req.body.userRole
        });
        newUser.save().then((user)=>res.status(201).json({'token':jwt.sign({'userID':user._id},process.env.ACCESS_SECRET_KEY),role:req.body.userRole}))
        .catch(err=>res.status(500).json('Error: '+err));
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:e.toString()
        });
    }
});
module.exports=authenticationRouter;