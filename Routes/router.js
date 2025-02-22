const express=require('express')


const userController=require('../Controller/userController')
const followController=require('../Controller/followController')
const postController=require('../Controller/postController')
const likeController=require('../Controller/likeController')
const commentController=require('../Controller/commentController')
const savedPostController=require('../Controller/savedPostController')
const storyController=require('../Controller/storyController')

const multerConfig=require('../Middleware/imageMiddleware')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const router=new express.Router()

router.post('/registeruser',userController.registerUser)
router.post('/registerotp',userController.verifyOtp)
router.post('/loginuser',userController.login)
router.post("/forgetPassword", userController.forgetPassword);
router.post("/verifyOtpAndResetPassword", userController.verifyOtpAndResetPassword);
router.get('/getuserslist',userController.getAllUsersList)
router.get('/getcurrentuser',jwtMiddleware,userController.getCurrentUser)
router.patch('/updateuserprofile',jwtMiddleware,multerConfig.single("image"),userController.updateUserProfile)
router.put('/addtofollowing',jwtMiddleware,followController.addToFollowing)
router.put('/addtofollowers/:id',jwtMiddleware,followController.addToFollowers)
router.put('/addtopostsuser',jwtMiddleware,postController.addToPostUser)
router.post('/addtoallposts',jwtMiddleware,multerConfig.single("image"),postController.addToAllPosts)
router.get('/getallposts',postController.getAllPosts)
router.delete('/deletemypost/:id',jwtMiddleware,postController.deletePost)
router.put('/deletepostuser/:postid',jwtMiddleware,postController.deletePostInUser)
router.put('/unfollowinguser/:followingId',jwtMiddleware,followController.unFollowingUser)
router.put('/unfollowersuser/:userId',jwtMiddleware,followController.unFollowersUser)
router.put('/addliketopostall/:id',jwtMiddleware,likeController.addLikeToPostedAll)
router.put('/adduserlikedpost/:id',jwtMiddleware,likeController.addUserLikedPost)
router.put('/removeliketopostall/:id',jwtMiddleware,likeController.removeLikeToPostedAll)
router.put('/removeuserlikedpost/:id',jwtMiddleware,likeController.removeUserLikedPost)
router.put('/addcommentintopost/:id',jwtMiddleware,commentController.addComments)
router.put('/deletecomment/:id/commentid/:commentId',jwtMiddleware,commentController.deleteComments)
router.put('/addcommentreply/:id/commentid/:commentId',jwtMiddleware,commentController.addCommentReply)
router.put('/deletecommentreply/:id/commentid/:commentId',jwtMiddleware,commentController.removeCommentReply)
router.put('/addsavedpostallpost/:postid',jwtMiddleware,savedPostController.addSavedPostInAllPost)
router.put('/addsavedpostuser/:postid',jwtMiddleware,savedPostController.addSavedPostInUser)
router.put('/removesavedpostallpost/:postid',jwtMiddleware,savedPostController.removeSavedPostInAllPost)
router.put('/removesavedpostuser/:postid',jwtMiddleware,savedPostController.removeSavedPostInUser)
router.post('/addstorytoallstories',jwtMiddleware,multerConfig.single("image"),storyController.addStoryToAllStories)
router.put('/addstorytouser',jwtMiddleware,storyController.addStoryToUser)
router.get('/getallstories',storyController.getAllStories)
router.delete('/deletestoryallstories/:id',jwtMiddleware,storyController.deleteStoryInAllStories)
router.put('/deletestoryuser/:id',jwtMiddleware,storyController.deleteStoryInUser)


module.exports=router

