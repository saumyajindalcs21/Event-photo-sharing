const mongoose=require('mongoose');

const ImageSchema=new mongoose.Schema({
    FileName:{
        type:String,
        required:true,
        trim:true,
    },
    FilePath:{
        type:String,
        required:true,
        trim:true,
    }
});

const Image = mongoose.model('Images',ImageSchema);
module.exports = Image;
