const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require('../Utils/wrapAsync');
const ExpressError=require('../Utils/ExpressError');
const {ImageSchema}=require('../ValidateSchema');
const Image=require('../Models/Images');
const multer  = require('multer')
const Room=require('../Models/Rooms');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
        cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({ storage: storage});

const validateImageSchema=(req,res,next)=>{
    let { error }=ImageSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//add Images
router.post('/AddImages', upload.single('room[Image]'),wrapAsync(async(req,res)=>{
    let{id}=req.params;
    console.log(req.params.id);
    let roomInfo = await Room.findById(req.params.id);
    console.log(roomInfo);
    let File=req.file;
    validateImageSchema;
    let newImage= new Image({
        FileName:File.filename,
        FilePath:File.path
    });
    roomInfo.Images.push(newImage);
    await newImage.save();
    await roomInfo.save();
    res.redirect(`/Rooms/${id}`);
}))

//delete image
router.post('/AddImages/:ImageId',wrapAsync(async(req,res)=>{
    let {id,ImageId}=req.params;
    await Room.findByIdAndUpdate(id,{$pull:{Images:ImageId}});
    await Image.findByIdAndDelete(ImageId);
    res.redirect(`/Rooms/${id}`);
}))

//show image
router.get('/showImage/:ImageId',wrapAsync(async(req,res)=>{
    let {id,ImageId}=req.params;
    let image=await Image.findById(ImageId);
    res.render("ShowImage.ejs",{image})
}))


module.exports=router;