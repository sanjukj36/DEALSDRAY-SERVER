const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    f_sno:{
        type:Number,
        required:true
    },
    f_userName:{
        type:String,
        required:true,
        unique:true
    },
    f_Pwd:{
        type:String,
        required:true
    },
})

const t_login= mongoose.model("t_login", userSchema)

module.exports = t_login
