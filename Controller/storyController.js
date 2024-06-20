const stories = require('../Models/storySchema')
const users = require('../Models/userSchema')

let storyId

exports.addStoryToAllStories = async (req, res) => {
    try {
        console.log("Inside add Story to all stories")
        const { username, dateOfPostedStory } = req.body
        const image = req.file.filename
        const userId = req.payload
        const result = new stories({ userId, image, username, dateOfPostedStory, likes: [] })
        await result.save()
        res.status(200).json(result)
        storyId = result._id.toHexString()
        console.log(result);
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err);
    }
}

exports.addStoryToUser = async (req, res) => {
    try {
        console.log("Inside add Story to User")
        const userId = req.payload
        const id = storyId
        console.log(id)
        const result = await users.updateOne(
            { _id: userId }, { $push: { story: { storyId: id } } }
        )
        res.status(200).json(result)
        console.log(result);
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err);
    }
}

exports.getAllStories = async (req, res) => {
    try {
        console.log("Inside Get All Stories")
        // const userId = req.payload
        // if (userId) {
            const result = (await stories.find()).reverse()
            res.status(200).json(result)
        }
        // else {
        //     console.log("Login First")
        //     res.status(402).json("Login First")
        // }
    // }
    catch (err) {
        res.status(401).json(err)
    }
}

// exports.getAllStoriesNotLogin = async (req, res) => {
//     try {
//         console.log("Inside Get All Stories")
//         const result = (await stories.find()).reverse()
//         res.status(200).json(result)
//     }
//     catch (err) {
//         res.status(401).json(err)
//     }
// }


exports.deleteStoryInAllStories = async (req, res) => {
    try {
        console.log("Inside deleteStoryInAllStories")
        const userId = req.payload
        const { id } = req.params
        const result = await stories.deleteOne({ _id: id, userId })
        res.status(200).json(result)
        console.log(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.deleteStoryInUser = async (req, res) => {
    try {
        console.log("deleteStoryInUser")
        const userId = req.payload
        const { id } = req.params
        const result = await users.updateOne(
            { _id: userId }, { $pull: { story: { storyId: id } } }
        )
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}