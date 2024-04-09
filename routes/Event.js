const express=require("express");
const router=express.Router();
const wrapAsync=require('../Utils/wrapAsync');
const ExpressError=require('../Utils/ExpressError');
const {RoomSchema}=require('../ValidateSchema');
const Room=require('../Models/Rooms');

const validateRoomSchema=(req,res,next)=>{
    let { error }=RoomSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

// room name route
router.get('/',wrapAsync(async(req,res)=>{
    const Rooms= await Room.find({});
    res.render('Gallery',{Rooms})
}))

//Add new room
router.get('/new',(req,res)=>{
    res.render("NewRoom.ejs");
})

// room info route
router.get('/:id',wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const roomInfo=await Room.findById(id).populate("Images");
    res.render("Images.ejs",{roomInfo});

}))

//create room
router.post('/',validateRoomSchema,wrapAsync(async(req,res)=>{
    let NewRoom=new Room(req.body.room);
    NewRoom.save();
    req.flash("success","New Event Created");
    res.redirect("/Rooms");
}))

//Edit Room Info
router.get('/:id/Edit',wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const roomInfo=await Room.findById(id);
    res.render("EditRoomInfo",{roomInfo});
}))

//Update Room Info
router.put('/:id',validateRoomSchema,wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await Room.findByIdAndUpdate(id,{...req.body.room}); 
    res.redirect(`/Rooms/${id}`);
}))

//delete room 
router.delete('/:id',wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await Room.findByIdAndDelete(id);
    res.redirect("/Rooms");
}))

module.exports=router;