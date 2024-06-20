const mongoose=require('mongoose')

const storySchema=new mongoose.Schema({
    image: {
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
    likes: {
        type: Array,
        default: []
    },
    dateOfPostedStory:{
        type:Date,
        required:true
    }
})

const stories=mongoose.model('stories',storySchema)

module.exports=stories