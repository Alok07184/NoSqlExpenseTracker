const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {expressjwt : expressjwt} = require('express-jwt');

exports.signin = async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password)
    {
        return res.status(402).json({
            message: 'Invalid email or password',
            success : false,
        })
    }

    const user = await User.findOne({email});

    if(user === {} || !(await user.correctPassword(password , user.password)))
    {
        return res.status(401).json({message: 'Invalid password' , success: false});
    }
    const token = jwt.sign({_id : user._id, isprimarymember : user.isprimarymember},"shhhhhhhhh");

    res.status(201).json({
        message : 'login',
        success : true,
        token : token
    });
}
exports.signup = async(req,res)=>{
    try{
    let data;
    data ={
        name: req.body.name,
        email : req.body.email,
        password : req.body.password,
        totalexpense : req.body.totalexpense,
        isprimarymember : req.body.isprimarymember,
        expenses : []
    }
    User.create(data,(err , result)=>{
        if(!err){
           return res.status(201).json({
            message: 'User created successfully', result
           })
        }
        res.status(400).json({
            message : 'fail',
            data : 'Invalid',
        });
    })
}catch(err){
    res.status(500).json({
        message : 'fail',
        data: err.message
    })
}
};