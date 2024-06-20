require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./Connections/db')
const router=require('./Routes/router')



const webgramServer=express()
webgramServer.use(cors())
webgramServer.use(express.json())
webgramServer.use(router)



const PORT=4000 || process.env.PORT

webgramServer.use('/upload',express.static('./uploads'))


webgramServer.listen(PORT,()=>{
    console.log('Ekart server started ' + PORT);
})

webgramServer.get('/',(req,res)=>{
    res.send("<h1>Daily WebGram Started... Waiting for Client requests...!!</h1>")
})
