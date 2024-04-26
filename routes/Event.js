const express=require("express");
const router=express.Router();
const wrapAsync=require('../Utils/wrapAsync');
const Room=require('../Models/Rooms');
const {isLoggedIn,isOwner,validateRoomSchema} = require("../Middleware");
const multer  = require('multer');

const RoomController = require('../Controllers/Events');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/EventProfilePic')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
        cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({ storage: storage});

router.route('/')
    .get(wrapAsync(RoomController.showEvents))
    .post(isLoggedIn ,upload.single('room[MainImage]'), wrapAsync(RoomController.CreateEvent));

//Add new room
router.get('/new',isLoggedIn,RoomController.AddEventForm)

router.route('/:id')
    .get(wrapAsync(RoomController.Event))
    .put(isLoggedIn,isOwner,upload.single('room[MainImage]'), wrapAsync(RoomController.UpdateEvent))
    .delete(isLoggedIn,isOwner,wrapAsync(RoomController.DeleteEvent));

//Edit Room Info
router.get('/:id/Edit', isLoggedIn, isOwner, wrapAsync(RoomController.EditEventInfoForm));

module.exports=router;