const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const defaultTheme = require('tailwindcss/defaultTheme')
const methodOverride=require("method-override");
const multer  = require('multer')


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


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


const Info=require('./Models/Information');
const Room=require('./Models/Rooms');
const Image=require('./Models/Images');


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

app.get('/',(req,res)=>{
    res.render('Home');
});

app.get('/Login',(req,res)=>{
    res.render('Login');
});

// room name route
app.get('/Rooms',async(req,res)=>{
    const Rooms= await Room.find({});
    res.render('Gallery',{Rooms})
})

//Add new room
app.get('/Rooms/new',(req,res)=>{
    res.render("NewRoom.ejs");
})

// room info route
app.get('/Rooms/:id',async(req,res)=>{
    let{id}=req.params;
    const roomInfo=await Room.findById(id).populate("Images");

    res.render("Images.ejs",{roomInfo});

})

//create room
app.post('/Rooms',async(req,res)=>{
    let NewRoom=new Room(req.body.room);
    NewRoom.save();
    res.redirect("/Rooms");
})

//Edit Room Info
app.get('/Rooms/:id/Edit',async(req,res)=>{
    let{id}=req.params;
    const roomInfo=await Room.findById(id);
    res.render("EditRoomInfo",{roomInfo});
})

//Update Room Info
app.put('/Rooms/:id',async(req,res)=>{
    let{id}=req.params;
    await Room.findByIdAndUpdate(id,{...req.body.room}); 
    res.redirect(`/Rooms/${id}`);
})

//delete room 
app.delete('/Rooms/:id',async(req,res)=>{
    let{id}=req.params;
    await Room.findByIdAndDelete(id);
    res.redirect("/Rooms");
})

//add Images
app.post('/Rooms/:id/AddImages', upload.single('Image') ,async(req,res)=>{
    let{id}=req.params;
    let roomInfo = await Room.findById(req.params.id);
    let newImage= new Image({
        FileName:req.file.filename,
        FilePath:req.file.path
    });
    roomInfo.Images.push(newImage);
    await newImage.save();
    await roomInfo.save();
    res.redirect(`/Rooms/${id}`);

})

//delete image
app.post('/Rooms/:id/AddImages/:ImageId',async(req,res)=>{
    let {id,ImageId}=req.params;
    await Room.findByIdAndUpdate(id,{$pull:{Images:ImageId}});
    await Image.findByIdAndDelete(ImageId);
    res.redirect(`/Rooms/${id}`);
})




const PORT = 5000;
app.listen(PORT,()=>{
    console.log('server run at port ',PORT);
})