const User = require('../models/user');

exports.getUserLeaderboard = async(req,res,next)=>{
    console.log("Hello");
   
    const leaderboaard = await User.find().sort([['totalexpense', -1]]);


    
    res.status(200).json(leaderboaard);
}