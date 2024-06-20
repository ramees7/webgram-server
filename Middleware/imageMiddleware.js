const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        console.log("filename inside");
        const filename =`Image-${Date.now()}-${file.originalname}`
        callback(null,filename)
        console.log(filename);
        console.log(file.originalname  ,"yyy");
    }
})

const fileFilter=(req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==="image/jpg" || file.mimetype==='image/avif' || file.mimetype==="image/webp" ){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error('only .png , .jpg , .jpeg,.avif ,.webp allowed'))
    }
}
const multerConfig=multer({
    storage,
    fileFilter
})

module.exports = multerConfig