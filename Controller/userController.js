const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')
const posts = require('../Models/postSchema')

const mongoose = require('mongoose')
let otp, user

exports.registerUser = async (req, res) => {
    try {
        console.log("inside Register")
        const { name, username, email, phone, password, confirmpassword } = req.body
        const existingUser = await users.findOne({ phone })
        const existingUsername = await users.findOne({ username })
        if (existingUser) {
            res.status(401).json("Existing User ! Use Unique Phone Number")
        }
        else {
            if (existingUsername) {
                res.status(401).json("Existing Username ! Use Unique Username")
            }
            else {
                if (password === confirmpassword) {
                    console.log("inside pass")

                    user = new users({ name, username, email, phone, password, confirmpassword, followers: [], following: [], bio: "", image: "profile-empty-icon.png", posts: [], story: [], dateOfRegister: new Date() })
                    
                    res.status(200).json(user)
                    await user.save()
                    // console.log(user)
                }

                else {
                    res.status(402).json("Password Doesnt Match")
                }
            }
        }
    }
    catch (err) {
        res.status(401).json(err)
        console.log("hjgbhj");
    }
}


exports.login = async (req, res) => {
    try {
        console.log("inside login");
        const { phone, password } = req.body
        const existingUser = await users.findOne({ phone, password })
        console.log(existingUser, "login")
        // if (existingAdmin) {
        //     const token = jwt.sign({ userId: existingAdmin._id }, process.env.JWT_SUPERKEY)
        //     res.status(200).json({
        //         existingAdmin,
        //         token,
        //         role: "Admin"
        //     })
        // }
        // else {
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SUPERKEY)
            res.status(200).json({
                existingUser,
                token,
                role: "User"
            })

        }
        else {
            res.status(401).json("No User Found ! Enter Valid Data")
        }
        // }
    }
    catch (err) {
        res.status(406).json(err)
    }
}




exports.getCurrentUser = async (req, res) => {
    try {
        console.log("Inside Get current user")
        const id = req.payload
        console.log(id, "iddd");
        const result = await users.findOne({ _id: id })
        // console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
        // console.log(err);
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        console.log("Inside Update User Profile")
        const id = req.payload
        console.log(id, "lol");
        // const { name, username, bio, phone, password, confirmpassword, email, followers, following, posts, savedPosts, likedPosts, dateOfRegister, story } = req.body
        const { name, username ,bio} = req.body
        console.log(req.body)   
        const image = req.file ? req.file.filename : req.body.image
        // const result = await users.updateOne(
        //     { _id: id }, { name, username, image, bio, phone, password, confirmpassword, email, followers, following, posts, savedPosts, likedPosts, dateOfRegister, story  }
        // )
        const result = await users.updateOne(
            { _id: id }, { name, username, image, bio}
        )
        res.status(200).json(result)
        // console.log(result)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err, "ererere")
    }
}




exports.getAllUsersList = async (req, res) => {
    try {
        console.log("Inside Get Users list")
        const searchKey=req.query.search
        console.log(req.query)
        const query={
            $or:[
                {name:{$regex:searchKey,$options:"i"}},
                {username:{$regex:searchKey,$options:"i"}},
            ]
        }
        const result = await users.find(query)
        // console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}
//     const query={
//         $or:[
//             {firstname:{$regex: SearchKey,$options:"i"}},
//             {lastname:{$regex: SearchKey,$options:"i"}},
//             {department:{$regex: SearchKey,$options:"i"}}
//         ]
//     }
//     try{
//         const result=await docters.find({$and:[
//             {status:"Accepted"},
//             query
//         ]} )

//         console.log(result);
//         res.status(200).json(result)
//     }
//     catch(err){
//         res.status(401).json(err)
//     }
// }








// exports.getFollowersList=async(req,res)=>{
//     try{
//         console.log("Inside Get Followers List")
//     }
//     catch(err){
//         res.status(401).json(err)
//     }
// }









// exports.registerUser = async (req, res) => {
//     try {
//         console.log("inside Register")
//         const { name, username, email, phone, password, confirmpassword } = req.body
//         const existingUser = await users.findOne({ phone, password })
//         if (existingUser) {
//             res.status(401).json("Existing User ! Use Unique Phone Number")
//         }
//         else {
//             if (password === confirmpassword) {
//                 console.log("inside pass")
//                 client.verify.v2.services("VAeae1690efefc9169b98d031602b50361")
//                     .verificationChecks
//                     .create({ to: `+91${phone}`, code: '123123' })
//                     .then(verification_check => console.log(verification_check.status));
//                 // const newUser = new users({ name, username, email, phone, password, confirmpassword, followers: [], following: [], bio: "", image: "", posts: [] })
//                 // await newUser.save()
//                 // res.status(200).json(newUser)
//                 // console.log(newUser)
//             }
//             else {
//                 res.status(402).json("Password Doesnt Match")
//             }
//         }
//     }
//     catch (err) {
//         res.status(401).json(err)
//     }
// }
