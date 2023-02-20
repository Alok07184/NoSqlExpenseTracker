const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId :{
        type : String,
    },
    paymentid : {
        type : String,
    },
    orderid : {
        type : String,
    },
    status : {
        type : String,
    }
});

module.exports = mongoose.model("Order", orderSchema);