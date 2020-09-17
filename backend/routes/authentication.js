const authenticationRouter=require('express').Router();
const jwt=require('jsonwebtoken');
const bCrypt=require('bcrypt');
let User=require('../models/users.model');
//Secret key generated with require('crypto').randomBytes(64).toString('hex')
authenticationRouter.route('/login').post(async (req,res)=>{
    try{
        let f=false;
        const allUsers=await User.find();
        allUsers.forEach(async(user)=>{
            if(user.email===req.body.email)
            {
                f=true;
                if(await bCrypt.compare(req.body.password,user.password))
                res.status(200).json({
                    'token':jwt.sign({'userID':user._id},process.env.ACCESS_SECRET_KEY)
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
authenticationRouter.route('/register').post(async (req,res)=>{
    try{
        const email=req.body.email;
        const hashedPassword=await bCrypt.hash(req.body.password,10);
        const newUser=new User({
            email:email,
            password:hashedPassword
        });
        newUser.save().then((doc)=>res.status(201).json({'status':'User Registered'+doc._id}))
        .catch(err=>res.status(500).json('Error: '+err));
    }catch(e){
        console.log(e);
        res.status(500).json({
            error:e.toString()
        });
    }
});
module.exports=authenticationRouter;