const Room = require("./Models/Rooms");
const ExpressError=require('./Utils/ExpressError');
const {RoomSchema, ImageSchema}=require('./ValidateSchema');

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to Create Event");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next) =>{
    let{id}=req.params;
    let roomInfo = await Room.findById(id);
    if(!roomInfo.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to edit");
        res.redirect(`/Rooms/${id}`);
    }
    next();
}

module.exports.validateRoomSchema=(req,res,next)=>{
    let { error }=RoomSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

module.exports.validateImageSchema=(req,res,next)=>{
    let { error }=ImageSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}