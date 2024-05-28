import express from "express";
import dotenv from "dotenv";
import dbConnect, { client } from "./config/db";
import cookieParser from "cookie-parser";
import cors from 'cors';
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken';
import { errorHandler } from './utils/error';
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
dbConnect().then(() => console.log('SQL connected successfully'));

// Middleware setup
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use user routes
app.use("/user", userRouter);
app.use('/admin',adminRouter)



app.use((err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal Sever Error'
    return res.status(statusCode).json({

        success: false,
        message,
        statusCode,

    })

})
// Signup route
// app.post('/signup', async (req: express.Request, res: express.Response) => {
//     const { username, email, phone, password } = req.body;

//     try {
//         console.log('signup request received');

//         const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
//         const checkResult = await client.query(checkQuery, [username, email]);

//         if (checkResult.rows.length > 0) {
//             return res.status(409).send({ success: false, message: "User already exists" });
//         }

//         // Encrypt password
//         const encryptedPassword = bcrypt.hashSync(password, 10);
//         console.log('Password encrypted');

//         // Insert new user
//         const query = 'INSERT INTO users (username, email, phone, password) VALUES ($1, $2, $3, $4)';
//         await client.query(query, [username, email, phone, encryptedPassword]);
//         console.log('User inserted successfully');

//         return res.status(200).send({ success: true });
//     } catch (error: any) {
//         console.error('Error during signup:', error);
//         return res.status(500).send({ success: false, message: "Internal server error" });
//     }
// });

// Login route
// app.post('/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     console.log("request recieved")

//     try {
//         const { email, password } = req.body;
//         const query = `SELECT email, password FROM users WHERE email = $1`;
//         const result = await client.query(query, [email]);
//         console.log("result:::", result);

//         if (result.rows.length === 0) {
//             return next(errorHandler(404, 'User not found'));
//         }

//         const validUser = result.rows[0];

//         const validPassword = bcrypt.compareSync(password, validUser.password);
//         if (!validPassword) {
//             return next(errorHandler(401, 'Wrong password'));
//         }

//         const token = JWT.sign({ id: validUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

//         return res.status(200).send({ success: true, message: "Login successful", token });
//     } catch (error: any) {
//         console.error('Error during login:', error);
//         return next(errorHandler(500, 'Internal server error'));
//     }
// });

// Start the server
app.listen(PORT, () =>
    console.log(`Server started running on http://localhost:${PORT}/`)
);

