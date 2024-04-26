const Joi=require('joi');

module.exports.RoomSchema=Joi.object({
    room:Joi.object({
        RoomName:Joi.string().required(),
        MainImage:Joi.string(),
        desc:Joi.string().required(),
    }).required()
})

module.exports.ImageSchema=Joi.object({
    File:Joi.object({
        FileName:Joi.string().required(),
        FilePath:Joi.string().required(),
    }).required()
})

module.exports.UserSchema=Joi.object({
    FirstName:Joi.string().required(),
    LastName:Joi.string().required(),
    Email:Joi.string().required(),
    username:Joi.string().required(),
    ProfilePic:Joi.object({
        FileName:Joi.string().required(),
        FilePath:Joi.string().required(),
    }).required(),
    UserBio:Joi.string().required()
})