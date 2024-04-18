const User=require("../Models/User");
const Room = require('../Models/Rooms');
const Image=require('../Models/Images');

module.exports.RenderLoginForm = (req,res)=>{
    res.render("login");
};

module.exports.UserSignUp = async(req,res)=>{
    try{
        let {FirstName,LastName,username,Email,password}=req.body;
        const newUser=new User({FirstName,LastName,username,Email});
        const registerUser= await User.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Hello "+ req.user.FirstName +" ! Welcome to MemoryShare!");
            res.redirect("/Rooms");
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/login");
    }
};

module.exports.UserLogin = async (req,res)=>{
    req.flash("success","Hello "+ req.user.FirstName +" ! Welcome to MemoryShare!");
    let redirectUrl = res.locals.redirectUrl || "/Rooms"
    res.redirect(redirectUrl);
};

module.exports.UserLogOut = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/Rooms");
    })
};

module.exports.UserProfile = async(req,res)=>{
    const Rooms= await Room.find({});
    const Images= await Image.find({});
    const Users = await User.find({});  
    res.render("Users/UserProfile",{Rooms,Images});
}

module.exports.UserProfileEdit = async(req,res)=>{
    res.render("Users/userProfileEdit");
}

module.exports.UpdateProfile = async(req,res)=>{
    // let {FirstName,LastName,Email,UserBio}=req.body;
    await User.findByIdAndUpdate(req.user._id,{...req.body.NewUser});
    req.flash("success","Your Profile details Changed successfully!");
    res.redirect("/UserProfile")
}

module.exports.ChangeProfilePic = async(req,res)=>{
    let File=req.file;
    let FileName=File.filename;
    let FilePath=File.path;
    const newuser={};
    newuser.ProfilePic = {FileName,FilePath};
    await User.findByIdAndUpdate(req.user._id,{...newuser});
    req.flash("success","Your Profile Pic Changed successfully!");
    res.redirect("/UserProfile");
}

module.exports.FutureUpdates = (req,res)=>{
    res.render("FutureUpdates");
}
