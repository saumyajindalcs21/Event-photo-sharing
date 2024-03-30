const mongoose=require('mongoose');

const InfoSchema=new mongoose.Schema({
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
    Password:{
        type:String,
        required:true,
        trim:true
    },
    MobileNumber:{
        type:String,
        required:true,
        trim:true
    },
    ProfilePic:{
        type:String,
        trim:true
    },
    Rooms:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rooms'
    }]

})

const Info = mongoose.model('Information',InfoSchema);
module.exports = Info;