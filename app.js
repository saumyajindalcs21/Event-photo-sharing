const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError=require('./Utils/ExpressError');
const session=require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")

//-------------Route required------------------

const RoomsRouter=require('./routes/Event');
const ImagesRouter=require('./routes/Images');
const UsersRouter=require('./routes/User');

//------------------DataBase Schema----------------

const User=require('./Models/User');
const Room=require('./Models/Rooms');
const Image=require('./Models/Images');

//----------------DataBase connection--------------

const MONGO_URL="mongodb://127.0.0.1:27017/MemoryHub";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
    .then( ()=>{
        console.log("connected to mongoDB");
    })
    .catch( (err)=>{
        console.log(err);
    });

//----------------Middlewares--------------

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

//-------------------Session,flash & Passport Authentication------------------

const sessionOptions={
    secret:"mySuperSecretCode",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser= req.user;
    next();
})

//---------------------Home Route--------------------

app.get('/',(req,res)=>{
    res.render('Home');
});


//---------------------Routes--------------------

app.use("/Rooms",RoomsRouter);
app.use("/Rooms/:id",ImagesRouter);
app.use("/",UsersRouter);


//--------------------Error Handling---------------

app.use("*",(req,res,next)=>{
    res.render("404-Error");
    // next(new ExpressError(400,"page not found"));
})

app.use((err,req,res,next)=>{
    let{statusCode=500,message="something went wrong"}=err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("Error",{err});
})

const PORT = 5000;
app.listen(PORT,()=>{
    console.log('server run at port ',PORT);
})



//Authentication and authorization
//ROles