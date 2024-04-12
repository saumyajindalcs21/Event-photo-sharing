const express=require("express");
const router=express.Router({mergeParams: true});
const User=require("../Models/User");
const wrapAsync = require("../Utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../Middleware");

const UserController = require('../Controllers/User');

router.route('/login')
      .get(UserController.RenderLoginForm)
      .post(saveRedirectUrl,
       passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}), 
       UserController.UserLogin);

router.post("/SignUp", wrapAsync(UserController.UserSignUp));

router.get("/logout", UserController.UserLogOut);


module.exports=router;