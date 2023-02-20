const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    totalexpense : {
        type : Number,
        
    },
    isprimarymember : {
        type : Boolean,
    },
    expenses : [{
        amount : {
            type : Number,
            required : true,
        },
        category : {
            type : String,
            required : true,
        },
        description : {
            type : String, 
            required : true,
        },

    }]
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  userSchema.methods.correctPassword = async function (candidatePass, userPass) {
    return await bcrypt.compare(candidatePass, userPass);
  };

  module.exports = mongoose.model("User", userSchema);