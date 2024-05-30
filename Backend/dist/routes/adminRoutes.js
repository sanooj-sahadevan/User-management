"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminControllers_1 = __importDefault(require("../controller/adminControllers"));
const adminRouter = (0, express_1.Router)();
adminRouter.post('/login', adminControllers_1.default.adminLoginPost);
adminRouter.post('/getdashboarddata', adminControllers_1.default.adminDashboardData);
// adminRouter.post('/login', adminControllers.adminLoginPost)
adminRouter.post('/verifyAdmin', adminControllers_1.default.verifyAdmin);
adminRouter.put('/edit/:id', adminControllers_1.default.editUser);
adminRouter.post('/add', adminControllers_1.default.addUser);
adminRouter.delete('/delete/:id', adminControllers_1.default.deleteUser);
exports.default = adminRouter;
