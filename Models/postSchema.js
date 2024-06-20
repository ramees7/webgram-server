const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    image: {
        type: String
    },
    caption: {
        type: String
    },
    userId: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    comments: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    dateOfPosted:{
        type:Date,
        required:true
    },
    saved: {
        type: Array,
        default: []
    }
})

const posts = mongoose.model("posts", postSchema)
module.exports = posts