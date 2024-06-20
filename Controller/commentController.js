const posts = require('../Models/postSchema')
const mongoose = require('mongoose')

exports.addComments = async (req, res) => {
    try {
        console.log("Inside Add Comment")
        const { comment, dateOfCommented, username } = req.body
        const userId=req.payload
        const commentId = new mongoose.Types.ObjectId()
        const { id } = req.params
        const result = await posts.updateOne(
            { _id: id }, { $push: { comments: { commentId, userId, comment, dateOfCommented, username, reply: [] } } }
        )
        res.status(200).json(result)
        console.log(result);
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.deleteComments = async (req, res) => {
    try {
        console.log("Inside Delete Comment")
        const { id ,commentId} = req.params
        const userId=req.payload
        const commentIdObject = new mongoose.Types.ObjectId(commentId)
        const result = await posts.updateOne(
            { _id: id }, { $pull: { comments: { commentId:commentIdObject,userId} } }
        )
        res.status(200).json(result)
        console.log(result);
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.addCommentReply = async (req, res) => {
    try {
        console.log("Inside Add Comment Reply")
        const { reply, dateOfReply, username } = req.body
        // console.log(req.body)
        const userId=req.payload
        const { id, commentId } = req.params
        // console.log(id, commentId)
        const postObjectId = new mongoose.Types.ObjectId(id)
        const commentObjectId = new mongoose.Types.ObjectId(commentId)
        const replyObject = { userId, reply, dateOfReply, username }

        const result = await posts.updateOne(
            { _id: postObjectId, "comments.commentId": commentObjectId },
            { $push: { "comments.$.reply": replyObject } }
        )
        res.status(200).json(result)
        // console.log(result, "resul");
    }
    catch (err) {
        res.status(401).json(err)
        // console.log(err, "rerr");
    }
}

exports.removeCommentReply = async (req, res) => {
    try {
        console.log("Inside remove Comment Reply")
        const userId=req.payload
        const { id, commentId } = req.params
        const postObjectId = new mongoose.Types.ObjectId(id)
        const commentObjectId = new mongoose.Types.ObjectId(commentId)
        const result = await posts.updateOne(
            { _id: postObjectId, "comments.commentId": commentObjectId },
            { $pull: { "comments.$.reply": {userId} } }
        )
        res.status(200).json(result)
        // console.log(result, "resul");
    }
    catch (err) {
        res.status(401).json(err)
        // console.log(err, "rerr");
    }
}

