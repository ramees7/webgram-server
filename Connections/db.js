const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB connected with WebGram");
}).catch((err)=>{
    console.log(err);
})