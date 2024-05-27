import express from "express";
import usercontroller from '../controller/userController'
const userRouter = express.Router();
import { upload } from "../service/multer";





userRouter.post('/signup', usercontroller.signupPost )
userRouter.post('/login', usercontroller.loginPost )
// userRouter.get('/logout', usercontroller.logoutGet )
userRouter.post('/verifyUser', usercontroller.verifyUser )
userRouter.post('/fetchUserData', usercontroller.fetchUserData)
userRouter.post('/uploadImage', upload.single('image'), usercontroller.uploadImage)




export default userRouter;
