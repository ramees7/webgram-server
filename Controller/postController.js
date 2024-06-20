const posts=require('../Models/postSchema')
const users=require('../Models/userSchema')
let postImgId,postIdDelete 



exports.addToAllPosts = async (req, res) => {
    try {
        console.log("Inside add to all posts")
        const { username, caption, dateOfPosted } = req.body
        console.log(req.body);
        const userId = req.payload
        const image = req.file.filename
        img = image
        cap = caption
        console.log(image, "img")
        const newPost = new posts({ caption, image, comments: [], likes: [], dateOfPosted, userId, username,saved:[] })
        await newPost.save()
        // console.log(newPost,"newpoat")
        postImgId = newPost._id.toHexString()
        console.log(postImgId,"::::::postimgid");
        res.status(200).json(newPost)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.addToPostUser = async (req, res) => {
    try {
        console.log("Inside add to post user")
        const postId = postImgId
        console.log(postId,"postid::::::::::::::");
        const id = req.payload
        const result = await users.updateOne(
            { _id: id }, { $push: { posts: { postId } } }
        )
        console.log(result)
        const data = await users.findOne({ _id: req.payload })
        res.status(200).json({ result, data })
        console.log(data);
    }
    catch (err) {
        res.status(401).json(err)
    }
}


exports.getAllPosts = async (req, res) => {
    try {
        console.log("Inside Get All Posts")
        const result = (await posts.find()).reverse()
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.deletePost = async (req, res) => {
    try {
        console.log("Inside delete post")
        const { id } = req.params
        console.log(id);
        postIdDelete=id
        const result = await posts.findByIdAndDelete({ _id: id })
        res.status(200).json(result)
        console.log(result, "result")
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.deletePostInUser = async (req, res) => {
    try {
        console.log("Inside delete post in user")
        const {postid } = req.params
        const userId=req.payload
        console.log(userId,postid);
        const result2 = await users.updateOne({ _id: userId }, { $pull: { posts: { postId:postid } } })
        console.log(result2, "result2");
        res.status(200).json(result2)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err);
    }
}
