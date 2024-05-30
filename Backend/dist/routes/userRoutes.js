"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const userRouter = express_1.default.Router();
const multer_1 = require("../service/multer");
userRouter.post('/signup', userController_1.default.signupPost);
userRouter.post('/login', userController_1.default.loginPost);
// userRouter.get('/logout', usercontroller.logoutGet )
userRouter.post('/verifyUser', userController_1.default.verifyUser);
userRouter.post('/fetchUserData', userController_1.default.fetchUserData);
userRouter.post('/uploadImage', multer_1.upload.single('image'), userController_1.default.uploadImage);
exports.default = userRouter;
