import express from "express";
import usercontroller from '../controller/userController'
const userRouter = express.Router();




userRouter.post('/signup', usercontroller.signupPost )
userRouter.post('/login', usercontroller.loginPost )
userRouter.get('/logout', usercontroller.logoutGet )



export default userRouter;
