import express from "express";
import dotenv from "dotenv";
import dbConnect, { client } from "./config/db";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from "./routes/userRoutes";
import bcrypt from "bcryptjs";

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

// Signup route
app.post('/signup', async (req: express.Request, res: express.Response) => {
    const { username, email, phone, password } = req.body;

    try {
        console.log('signup request vannu');
        
        const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const checkResult = await client.query(checkQuery, [username, email]);
        
        // if (checkResult.rows.length > 0) {
        //     return res.status(409).send({ success: false, message: "User already exists" });
        // }

        // Encrypt password
        const encryptedPassword = bcrypt.hashSync(password, 10);
        console.log('Password encrypted');

        // Insert new user
        const query = 'INSERT INTO users (username, email, phone, password) VALUES ($1, $2, $3, $4)';
        await client.query(query, [username, email, phone, encryptedPassword]);
        console.log('User insert ayi-- vijayam');
 
        return res.status(200).send({ success: true });
    } catch (error: any) {
        console.error('Error during signup:', error);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
});

// Start the server
app.listen(PORT, () =>
    console.log(`Server started running on http://localhost:${PORT}/`)
);
