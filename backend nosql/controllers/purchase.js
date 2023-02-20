const Razorpay = require('razorpay');
const Order = require('../models/orders');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function generateAccessToken(id,isprimarymember){
    return jwt.sign({_id : id,isprimarymember},"shhhhhhhhh");
}

exports.purchasepremium = async (req,res)=>{
    try{
        var rzp = new Razorpay({
            key_id : "rzp_test_EDnIiJFSDKWxRo",
            key_secret :"Zf6i0fJjOf2q6Vd0ChPaQOkX"
        })
        const amount = 1000;
        rzp.orders.create({amount,currency: "INR"},(err,order)=>{
            if(err){
                throw new Error(err);
            }
            Order.create({userId : req.user._id , orderid : order.id, status : 'PENDING'}).then(()=>{
                return res.status(201).json({order, key_id:rzp.key_id});
            }).catch(err=>{
                throw new Error(err);
            })
        })
    }catch(err){
        console.log(err);
        res.status(403).json({message : 'Something went wrong',error : err.message});
    }
}



exports.updateTransaction = (req,res)=>{
    try{
        const userId = req.user._id;
        const {payment_id, order_id} = req.body;
        Order.findOne({orderid : order_id}).then(order=>{
            order.update({paymentid : payment_id, status : 'SUCCESSFUL'}).then(()=>{
                User.updateOne({isprimarymember : true}).then(()=>{
                    return res.status(202).json({success : true, message : "Transaction Successful", token : generateAccessToken(userId, true)});
                }).catch(err=>{
                    throw new Error(err);
                })
            }).catch(err=>{
                throw new Error(err);
            })
        }).catch(err=>{
            throw new Error(err);
        })
    }catch(err){
        res.status(404).json({success : false, message :err.message});
    }
}