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

    // Creating a JWT token and sending it in the body
    const userJWT = JWT.sign({ email }, String(process.env.JWT_KEY), {
      expiresIn: "1h",
    });

    return res.status(200).send({ success: true, message: "Login successful", userJWT });
  } catch (error: any) {
    console.error('Error during login:', error);
    return next(errorHandler(500, 'Internal server error'));
  }
};

const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userJWT } = req.body;
    const verifyJWT = JWT.verify(
      userJWT,
      String(process.env.JWT_KEY)
    ) as DecodedJWT;

    return res.status(200).send({ success: true, message: "User JWT verified successfully" });
  } catch (error: any) {
    if (error?.message === "invalid signature") {
      res.status(401).send({ success: false, message: "User JWT failed to verify" });
    } else {
      res.status(500).send({ success: false, message: "Internal server error" });
    }
  }
};

const fetchUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Fetching user data');

    const { userJWT } = req.body;
    const { email } = JWT.verify(userJWT, String(process.env.JWT_KEY)) as DecodedJWT;

    const query = `SELECT username, email, phone, image FROM users WHERE email=$1`;
    const result = await client.query(query, [email]);
    const userData = result.rows[0];

    if (!userData) {
      return next(errorHandler(404, 'User data not found'));
    }

    res.status(200).send({ success: true, userData });
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    return next(errorHandler(500, 'Internal server error'));
  }
};

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Uploading image');
    
    console.log(req.file?.filename);

    const { userJWT } = req.body;
    const { email } = JWT.verify(userJWT, String(process.env.JWT_KEY)) as DecodedJWT;

    const query = `UPDATE users SET image = $1 WHERE email = $2`;
    await client.query(query, [req.file?.filename, email]);

    res.status(200).send({ success: true });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return next(errorHandler(500, 'Internal server error'));
  }
};

export default { signupPost, loginPost, verifyUser, fetchUserData, uploadImage };
