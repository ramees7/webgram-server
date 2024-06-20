const users = require('../Models/userSchema')
const posts = require('../Models/postSchema')

exports.addLikeToPostedAll = async (req, res) => {
    try {
        console.log("Inside add to like posted All")
        const { id } = req.params //posted image Id
        console.log(id);
        const { likedUserId } = req.body
        console.log(likedUserId);
        const result = await posts.updateOne({ _id: id }, { $push: { likes: { likedUserId } } })
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json(err)
        console.log(err, "error");
    }
}

exports.addUserLikedPost=async(req,res)=>{
    try{
        console.log("Inside add user liked post")
        const {id}=req.params //posted user userid
        const {postId}=req.body
        const result=await users.updateOne({_id:id},{$push:{likedPosts:{postId}}})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json(err)
    }
}

exports.removeLikeToPostedAll = async (req, res) => {
    try {
        console.log("Inside add to like posted All")
        const { id } = req.params //posted image Id
        console.log(id);
        const { likedUserId } = req.body
        console.log(likedUserId);
        const result = await posts.updateOne({ _id: id }, { $pull: { likes: { likedUserId } } })
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(400).json(err)
        console.log(err, "error");
    }
}

exports.removeUserLikedPost=async(req,res)=>{
    try{
        console.log("Inside add user liked post")
        const {id}=req.params //posted user userid
        const {postId}=req.body
        const result=await users.updateOne({_id:id},{$pull:{likedPosts:{postId}}})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(400).json(err)
    }
}

// exports.getUserLikedPosts=async(req,res)=>{
//     try{
//         console.log("Inside Get User Liked Posts")
//         // const result=await
//     }
//     catch(err){
//         res.status(401).json(err)
//     }
// }

