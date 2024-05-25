import { client } from "../config/db";
import bcrypt from "bcryptjs";
import express, { Request, Response, NextFunction } from "express";
import JWT from 'jsonwebtoken';
import { errorHandler } from '../utils/error';

type DecodedJWT = {
  email: string;
  iat: number;
  exp: number;
};

const signupPost = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, phone, password } = req.body;

  try {
    console.log('Signup request received');

    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
    const checkResult = await client.query(checkQuery, [username, email]);

    if (checkResult.rows.length > 0) {
      return res.status(409).send({ success: false, message: "User already exists" });
    }

    // Encrypt password
    const encryptedPassword = bcrypt.hashSync(password, 10);
    console.log('Password encrypted');

    // Insert new user
    const query = 'INSERT INTO users (username, email, phone, password) VALUES ($1, $2, $3, $4)';
    await client.query(query, [username, email, phone, encryptedPassword]);
    console.log('User inserted successfully');

    // Creating a JWT token and sending it in the body
    const userJWT = JWT.sign({ email }, String(process.env.JWT_KEY), {
      expiresIn: "1h",
    });

    return res.status(200).send({ success: true, userJWT });
  } catch (error: any) {
    console.error('Error during signup:', error);
    return next(errorHandler(500, 'Internal server error'));
  }
};

const loginPost = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Login request received");

  try {
    const { email, password } = req.body;
    const query = `SELECT email, password FROM users WHERE email = $1`;
    const result = await client.query(query, [email]);
    console.log("Query result:", result);

    if (result.rows.length === 0) {
      return next(errorHandler(404, 'User not found'));
    }

    const validUser = result.rows[0];
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, 'Wrong password'));
    }

    // Creating a JWT token and sending it in the body and as a cookie
    const userJWT = JWT.sign({ email }, String(process.env.JWT_KEY), {
      expiresIn: "1h",
    });

    return res.status(200).send({ success: true, message: "Login successful", userJWT });
  } catch (error: any) {
    console.error('Error during login:', error);
    return next(errorHandler(500, 'Internal server error'));
  }
};

// const logoutGet = (req: Request, res: Response) => {
//   console.log('Logout request received');
//   res.status(200).json({ success: true, message: 'Logout successful' });
//   console.log('Logout successful');
// };




const verifyUser = async (req: any, res: any) => {
  try {
    const { userJWT } = req.body;
    const verifyJWT = JWT.verify(
      userJWT,
      String(process.env.JWT_KEY)
    ) as DecodedJWT;

    return res
      .status(200)
      .send({ success: true, message: "User JWT verified successfully" });
  } catch (error: any) {
    if (error?.message === "invalid signature") {
      res
        .status(401)
        .send({ success: false, message: "User JWT failed to veify" });
    }
  }
}






export default { signupPost, loginPost,verifyUser };
