const mongoose=require('mongoose');
const Image=require("./Images");

const RoomSchema=new mongoose.Schema({
    RoomName:{
        type:String,
        required:true,
        trim:true,
    },
    MainImage:{
        type:String,
        trim:true,
        default: "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" ,
        set:(v)=> v===""?"https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" :v,
    },
    desc:{
        type:String,
        required:true,
        trim:true,
    },
    Images:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Images'
    }]
});

RoomSchema.post('findOneAndDelete',async(Room)=>{
    if(Room){
    await Image.deleteMany({_id:{$in: Room.Images}});
    }
});


const Room = mongoose.model('Rooms',RoomSchema);
module.exports = Room;