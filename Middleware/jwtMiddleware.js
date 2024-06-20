const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwt Middleware");
    try{
        const token=req.headers.authorization.split(" ")[1]
        console.log("token from jwt ," + token)
        if(token){
            console.log("inside token jwt");
            const result=jwt.verify(token,process.env.JWT_SUPERKEY)
            console.log(result," result")
            req.payload=result.userId
            console.log(req.payload)
            next()
        }
        else{
            res.status(401).json("Token not Available")
        }
    }
    catch(err){
        res.status(406).json( " Authorization Failed ! Login  First")
    }
}

module.exports=jwtMiddleware