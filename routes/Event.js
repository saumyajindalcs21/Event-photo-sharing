const express=require("express");
const router=express.Router();
const wrapAsync=require('../Utils/wrapAsync');
const Room=require('../Models/Rooms');
const {isLoggedIn,isOwner,validateRoomSchema} = require("../Middleware");

const RoomController = require('../Controllers/Events');

router.route('/')
    .get(wrapAsync(RoomController.showEvents))
    .post(isLoggedIn,validateRoomSchema, wrapAsync(RoomController.CreateEvent));

//Add new room
router.get('/new',isLoggedIn,RoomController.AddEventForm)

router.route('/:id')
    .get(wrapAsync(RoomController.Event))
    .put(isLoggedIn,isOwner,validateRoomSchema, wrapAsync(RoomController.UpdateEvent))
    .delete(isLoggedIn,isOwner,wrapAsync(RoomController.DeleteEvent));

//Edit Room Info
router.get('/:id/Edit', isLoggedIn, isOwner, wrapAsync(RoomController.EditEventInfoForm));

module.exports=router;