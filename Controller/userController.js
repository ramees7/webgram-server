const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const posts = require("../Models/postSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
let otp, user;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.registerUser = async (req, res) => {
  try {
    console.log("inside Register");
    const { name, username, email, phone, password, confirmpassword } =
      req.body;

    const existingUser = await users.findOne({ phone });
    const existingUsername = await users.findOne({ username });

    if (existingUser) {
      return res.status(401).json("Existing User! Use Unique Phone Number");
    }

    if (existingUsername) {
      return res.status(401).json("Existing Username! Use Unique Username");
    }

    if (password !== confirmpassword) {
      return res.status(402).json("Passwords Do Not Match");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save user temporarily without finalizing registration
    user = {
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    };

    // Send OTP Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Registration",
      text: `Your OTP for registration is: ${otp}. This OTP is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json("OTP sent to your email. Please verify.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};

// Verify OTP and Save User
exports.verifyOtp = async (req, res) => {
  const { enteredOtp } = req.body;

  if (enteredOtp === otp) {
    // Add the current date to the user object
    const newUser = new users({
      ...user, // Spread existing user data
      dateOfRegister: new Date(), // Set the current date and time
    });

    try {
      await newUser.save(); // Save the user in the database
      otp = null; // Clear OTP after successful verification
      res.status(200).json("Registration Successful");
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json("Error registering user");
    }
  } else {
    res.status(401).json("Invalid OTP");
  }
};

exports.login = async (req, res) => {
  try {
    console.log("inside login");
    const { phone, password } = req.body;
    // const existingUser = await users.findOne({ phone, password })
    const existingUser = await users.findOne({ phone });

    if (!existingUser) {
      return res.status(401).json("No User Found! Enter Valid Phone Number");
    }
    // Compare password using bcrypt (ensure bcrypt is imported)
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json("Invalid Password! Please try again.");
    } else {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SUPERKEY
      );
      res.status(200).json({
        existingUser,
        token,
        role: "User",
      });
    }
  } catch (err) {
    res.status(406).json(err);
    console.log(err);
  }
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json("No user found with this email.");
    }

    // Generate OTP
    otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json("OTP sent to your email.");
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
};


exports.verifyOtpAndResetPassword = async (req, res) => {
    const { email, otp: enteredOtp, newPassword } = req.body;
  
    // Ensure OTP exists and is valid
    if (!otp || enteredOtp !== otp) {
      return res.status(401).json("Invalid or expired OTP");
    }
  
    try {
      const user = await users.findOne({ email });
      if (!user) {
        return res.status(404).json("No user found with this email.");
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      // Update user's password
      user.password = hashedPassword;
      await user.save();
  
      otp = null; // Clear OTP after successful verification
  
      res.status(200).json({ success: true, message: "Password reset successful." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  

exports.getCurrentUser = async (req, res) => {
  try {
    console.log("Inside Get current user");
    const id = req.payload;
    console.log(id, "iddd");
    const result = await users.findOne({ _id: id });
    // console.log(result)
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json(err);
    // console.log(err);
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    console.log("Inside Update User Profile");
    const id = req.payload;
    console.log(id, "lol");
    // const { name, username, bio, phone, password, confirmpassword, email, followers, following, posts, savedPosts, likedPosts, dateOfRegister, story } = req.body
    const { name, username, bio } = req.body;
    console.log(req.body);
    const image = req.file ? req.file.filename : req.body.image;
    // const result = await users.updateOne(
    //     { _id: id }, { name, username, image, bio, phone, password, confirmpassword, email, followers, following, posts, savedPosts, likedPosts, dateOfRegister, story  }
    // )
    const result = await users.updateOne(
      { _id: id },
      { name, username, image, bio }
    );
    res.status(200).json(result);
    // console.log(result)
  } catch (err) {
    res.status(401).json(err);
    console.log(err, "ererere");
  }
};

exports.getAllUsersList = async (req, res) => {
  try {
    console.log("Inside Get Users list");
    const searchKey = req.query.search;
    console.log(req.query);
    const query = {
      $or: [
        { name: { $regex: searchKey, $options: "i" } },
        { username: { $regex: searchKey, $options: "i" } },
      ],
    };
    const result = await users.find(query);
    // console.log(result)
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json(err);
  }
};
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
