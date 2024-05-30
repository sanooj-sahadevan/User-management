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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
// import { signupValidator } from "../helpers/formValidations";
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const adminLoginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const emailMatch = email == process.env.ADMIN_EMAIL;
        const passMatch = password == process.env.ADMIN_PASS;
        if (emailMatch && passMatch) {
            const adminJWT = jsonwebtoken_1.default.sign({ email }, String(process.env.JWT_KEY), {
                expiresIn: "1h",
            });
            res.status(200).send({ success: true, adminJWT });
        }
        else {
            res
                .status(401)
                .send({ success: false, message: "Invalid Credentials" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const adminDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT id,username,email,phone FROM users`;
        const dashboardData = yield db_1.client.query(query);
        res
            .status(200)
            .send({ success: true, dashboardData: dashboardData === null || dashboardData === void 0 ? void 0 : dashboardData.rows });
    }
    catch (error) {
        res
            .status(500)
            .send({ success: false, message: "Failed to fetch data from db" });
    }
});
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('1');
        const { id } = req.params;
        const { username, email, phone } = req.body;
        console.log('Request params:', req.params);
        console.log('Request body before update:', req.body);
        const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const checkResult = yield db_1.client.query(checkQuery, [username, email]);
        if (checkResult.rows.length > 0) {
            return res.status(208).send({ success: false, message: 'Username or email already exists' });
        }
        const updateQuery = 'UPDATE users SET username = $1, email = $2, phone = $3 WHERE id = $4';
        yield db_1.client.query(updateQuery, [username, email, phone, id]);
        console.log('Executed query:', updateQuery);
        console.log('Updated values:', { username, email, phone });
        res.status(200).send({ success: true });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'An error occurred' });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(req.params + 'req');
        const query = `DELETE FROM users WHERE id= $1`;
        yield db_1.client.query(query, [id]);
        res.status(200).send({ success: true });
    }
    catch (error) {
        console.log(error);
    }
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request received');
        const { username, email, phone, password } = req.body;
        console.log('Request body:', req.body);
        const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const checkResult = yield db_1.client.query(checkQuery, [username, email]);
        if (checkResult.rows.length > 0) {
            return res.status(208).send({ success: false, message: 'Username or email already exists' });
        }
        // Encrypt the password
        const encryptedPassword = bcryptjs_1.default.hashSync(password, 10);
        console.log('Encrypted password:', encryptedPassword);
        // Insert user into the database
        const query = `INSERT INTO users (username, email, phone, password) 
                     VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [username, email, phone, encryptedPassword];
        const result = yield db_1.client.query(query, values);
        console.log('Inserted user:', result.rows[0]);
        res.status(200).send({ success: true, user: result.rows[0] });
    }
    catch (error) {
        console.error('Error inserting user:', error);
        if (error.code === "23505") { // Unique violation
            res.status(208).send({ success: false, message: "Credentials already exists" });
        }
        else {
            res.status(500).send({ success: false, message: "Internal Server Error" });
        }
    }
});
const verifyAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('verity admin');
        const { adminJWT } = req.body;
        const verifyJWT = jsonwebtoken_1.default.verify(adminJWT, String(process.env.JWT_KEY));
        if (verifyJWT.email !== process.env.ADMIN_EMAIL) {
            return res
                .status(401)
                .send({ success: false, message: "Admin JWT failed to verify" });
        }
        return res
            .status(200)
            .send({ success: true, message: "Admin JWT verified successfully" });
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.message) === "invalid signature") {
            res
                .status(401)
                .send({ success: false, message: "Admin JWT failed to verify" });
        }
    }
});
exports.default = { adminLoginPost, adminDashboardData, editUser, addUser, deleteUser, verifyAdmin };
