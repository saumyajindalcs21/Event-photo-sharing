const Joi=require('joi');

module.exports.RoomSchema=Joi.object({
    room:Joi.object({
        RoomName:Joi.string().required(),
        MainImage:Joi.string().required(),
        desc:Joi.string().required(),
    }).required()
})

module.exports.ImageSchema=Joi.object({
    File:Joi.object({
        FileName:Joi.string().required(),
        FilePath:Joi.string().required(),
    }).required()
})