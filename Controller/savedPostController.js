const posts=require('../Models/postSchema')
const users=require('../Models/userSchema')


exports.addSavedPostInAllPost=async(req,res)=>{
    try{
        console.log("Inside add Saved Post All post")
        const userid=req.payload
        const {postid}=req.params
        const result=await posts.updateOne({_id:postid},{$push:{saved:{userId:userid}}})
        res.status(200).json(result)
    }
    catch(err){
        res.status(200).json(err)
    }
}


exports.addSavedPostInUser=async(req,res)=>{
    try{
        console.log("Inside add Saved Post user")
        const userid=req.payload
        const {postid}=req.params
        const result=await users.updateOne({_id:userid},{$push:{savedPosts:{postId:postid}}})
        res.status(200).json(result)
    }
    catch(err){
        res.status(200).json(err)
    }
}

exports.removeSavedPostInAllPost=async(req,res)=>{
    try{
        console.log("Inside remove Saved Post All post")
        const userid=req.payload
        const {postid}=req.params
        const result=await posts.updateOne({_id:postid},{$pull:{saved:{userId:userid}}})
        res.status(200).json(result)
    }
    catch(err){
        res.status(200).json(err)
    }
}


exports.removeSavedPostInUser=async(req,res)=>{
    try{
        console.log("Inside remove Saved Post user")
        const userid=req.payload
        const {postid}=req.params
        const result=await users.updateOne({_id:userid},{$pull:{savedPosts:{postId:postid}}})
        res.status(200).json(result)
    }
    catch(err){
        res.status(200).json(err)
    }
}