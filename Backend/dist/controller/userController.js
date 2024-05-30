"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error");
const signupPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, phone, password } = req.body;
    try {
        console.log('Signup request received');
        // Check if user already exists
        const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const checkResult = yield db_1.client.query(checkQuery, [username, email]);
        if (checkResult.rows.length > 0) {
            return res.status(409).send({ success: false, message: "User already exists" });
        }
        // Encrypt password
        const encryptedPassword = bcryptjs_1.default.hashSync(password, 10);
        console.log('Password encrypted');
        // Insert new user
        const query = 'INSERT INTO users (username, email, phone, password) VALUES ($1, $2, $3, $4)';
        yield db_1.client.query(query, [username, email, phone, encryptedPassword]);
        console.log('User inserted successfully');
        // Creating a JWT token and sending it in the body
        const userJWT = jsonwebtoken_1.default.sign({ email }, String(process.env.JWT_KEY), {
            expiresIn: "1h",
        });
        return res.status(200).send({ success: true, userJWT });
    }
    catch (error) {
        console.error('Error during signup:', error);
        return next((0, error_1.errorHandler)(500, 'Internal server error'));
    }
});
const loginPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Login request received");
    try {
        const { email, password } = req.body;
        const query = `SELECT email, password FROM users WHERE email = $1`;
        const result = yield db_1.client.query(query, [email]);
        console.log("Query result:", result);
        if (result.rows.length === 0) {
            return next((0, error_1.errorHandler)(404, 'User not found'));
        }
        const validUser = result.rows[0];
        const validPassword = bcryptjs_1.default.compareSync(password, validUser.password);
        if (!validPassword) {
            return next((0, error_1.errorHandler)(401, 'Wrong password'));
        }
        // Creating a JWT token and sending it in the body
        const userJWT = jsonwebtoken_1.default.sign({ email }, String(process.env.JWT_KEY), {
            expiresIn: "1h",
        });
        return res.status(200).send({ success: true, message: "Login successful", userJWT });
    }
    catch (error) {
        console.error('Error during login:', error);
        return next((0, error_1.errorHandler)(500, 'Internal server error'));
    }
});
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userJWT } = req.body;
        const verifyJWT = jsonwebtoken_1.default.verify(userJWT, String(process.env.JWT_KEY));
        return res.status(200).send({ success: true, message: "User JWT verified successfully" });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.message) === "invalid signature") {
            res.status(401).send({ success: false, message: "User JWT failed to verify" });
        }
        else {
            res.status(500).send({ success: false, message: "Internal server error" });
        }
    }
});
const fetchUserData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Fetching user data');
        const { userJWT } = req.body;
        const { email } = jsonwebtoken_1.default.verify(userJWT, String(process.env.JWT_KEY));
        const query = `SELECT username, email, phone, image FROM users WHERE email=$1`;
        const result = yield db_1.client.query(query, [email]);
        const userData = result.rows[0];
        if (!userData) {
            return next((0, error_1.errorHandler)(404, 'User data not found'));
        }
        res.status(200).send({ success: true, userData });
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        return next((0, error_1.errorHandler)(500, 'Internal server error'));
    }
});
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log('Uploading image');
        console.log((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename);
        const { userJWT } = req.body;
        const { email } = jsonwebtoken_1.default.verify(userJWT, String(process.env.JWT_KEY));
        const query = `UPDATE users SET image = $1 WHERE email = $2`;
        yield db_1.client.query(query, [(_b = req.file) === null || _b === void 0 ? void 0 : _b.filename, email]);
        res.status(200).send({ success: true });
    }
    catch (error) {
        console.error('Error uploading image:', error);
        return next((0, error_1.errorHandler)(500, 'Internal server error'));
    }
});
exports.default = { signupPost, loginPost, verifyUser, fetchUserData, uploadImage };
