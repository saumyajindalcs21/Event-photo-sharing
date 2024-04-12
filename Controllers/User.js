const User=require("../Models/User");

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