const Image=require('../Models/Images');
const Room=require('../Models/Rooms');
const {validateImageSchema}= require('../Middleware');

module.exports.AddImage = async(req,res)=>{
    let{id}=req.params;
    let roomInfo = await Room.findById(req.params.id);
    let File=req.file;
    validateImageSchema;
    let newImage= new Image({
        FileName:File.filename,
        FilePath:File.path
    });
    roomInfo.Images.push(newImage); 
    await newImage.save();
    await roomInfo.save();
    req.flash("success","Image added successfully!");
    res.redirect(`/Rooms/${id}`);
};

module.exports.DeleteImage = async(req,res)=>{
    let {id,ImageId}=req.params;
    await Room.findByIdAndUpdate(id,{$pull:{Images:ImageId}});
    await Image.findByIdAndDelete(ImageId);
    req.flash("success","Image deleted successfully!");
    res.redirect(`/Rooms/${id}`);
};

module.exports.ShowImage = async(req,res)=>{
    let {id,ImageId}=req.params;
    let image=await Image.findById(ImageId);
    res.render("ShowImage.ejs",{image})
};