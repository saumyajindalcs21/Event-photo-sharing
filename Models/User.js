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
        FileName:{
            type:String,
            required:true,
            default: "Default_Profile_Pic.jpg" ,
            set:(v)=> v===""?"Default_Profile_Pic.jpg" :v,

        },
        FilePath:{
            type:String,
            required:true,
            default: "uploads\ProfilePictures\Default_Profile_Pic.jpg" ,
            set:(v)=> v===""?"uploads\ProfilePictures\Default_Profile_Pic.jpg" :v,
        }
    },
    UserBio:{
        type:String,
        trim:true,
        default: "Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️" ,
        set:(v)=> v===""?"Lorem ipsum dolor sit, amet consectetur adipisicing elit 📷✈️🏕️" :v,
    }

})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',UserSchema);
module.exports = User;