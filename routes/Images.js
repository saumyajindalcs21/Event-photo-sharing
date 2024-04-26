const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require('../Utils/wrapAsync');
const Image=require('../Models/Images');
const Room=require('../Models/Rooms');
const multer  = require('multer');
const {validateImageSchema,isLoggedIn,isOwner}=require('../Middleware');

const ImageController = require('../Controllers/Images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/Images')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
        cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({ storage: storage});

//add Images
router.post('/AddImages',isLoggedIn,isOwner,upload.single('room[Image]'),wrapAsync(ImageController.AddImage));

//delete image
router.post('/AddImages/:ImageId',isLoggedIn,isOwner,wrapAsync(ImageController.DeleteImage));

//show image
router.get('/showImage/:ImageId',wrapAsync(ImageController.ShowImage));


module.exports=router;