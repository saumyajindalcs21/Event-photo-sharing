const mongoose=require('mongoose');
const passportLocalMongoose=require("passport-local-mongoose");

const UserSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        trim:true
    },
    LastName:{
        type:String,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true,
        trim:true
    },
    ProfilePic:{
        type:String,
        trim:true,
        default: "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" ,
        set:(v)=> v===""?"https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" :v,
    },
    Rooms:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rooms'
    }]

})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',UserSchema);
module.exports = User;