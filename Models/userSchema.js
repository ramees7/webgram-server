const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Invalid Email Address"],
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    savedPosts: {
      type: Array,
      default: [],
    },
    likedPosts: {
      type: Array,
      default: [],
    },
    dateOfRegister: {
      type: Date,
      required: true,
    },
    story: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);
module.exports = users;
