const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req,res,next)=>{
    try{
        
    const token = req.header('Authorization');
    console.log(token);
    const user = jwt.verify(token,"shhhhhhhhh");
    console.log(user);
    console.log(user._id);
    User.findById(user._id).then(user=>{
        req.user = user;
        next();
    })
    }catch(err){
        res.status(401).json({message:err.message});
    }
}

module.exports ={ authenticate};