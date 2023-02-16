const mongoose = require('mongoose');


const userSchema =new mongoose.Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        unique: true
    },
    password:{
        type:String,
    },
    token:{
        type:String,
    },
},{
    timestamps:true
}
)

module.exports = mongoose.model('User',userSchema)