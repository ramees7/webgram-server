const users = require('../Models/userSchema')

exports.addToFollowing = async (req, res) => {
    try {
        console.log("Inside add to following")
        const { userId} = req.body
        const id  = req.payload
        console.log(userId,"userid");
        console.log(id,"id");
        const existingFollowing = await users.findOne({ _id: id, 'following.userId': userId })
        const existingFollowing1 = await users.findOne({ _id: id })
        // console.log(existingFollowing ,"jok")
        if (!existingFollowing || existingFollowing1.following==[]) {
            const result = await users.updateOne(
                { _id: id }, { $push: { following: { userId} } }
            )
            console.log(result);
            res.status(200).json(result)
        }
        else{
            res.status(402).json("Already Following")
            console.log("already");
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.addToFollowers = async (req, res) => {
    try {
        console.log("Inside add to followers")
        const  userId  = req.payload
        const { id } = req.params
        const result = await users.updateOne(
            { _id: id }, { $push: { followers: { userId} } }
        )
        console.log(result);
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err);
    }
}

exports.unFollowingUser=async(req,res)=>{
    try{
        console.log("Inside Unfollowing user")
        const userId=req.payload
        const {followingId}=req.params
        const result=await users.updateOne({_id:userId},{$pull : {following:{userId:followingId}}})
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.unFollowersUser=async(req,res)=>{
    try{
        console.log("Inside Unfollowers user")
        const {userId}=req.params
        const followersId=req.payload
        console.log(userId,followersId);
        const result=await users.updateOne({_id:userId},{$pull : {followers:{userId:followersId}}})
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}




