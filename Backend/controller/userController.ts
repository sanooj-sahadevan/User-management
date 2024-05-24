import { client } from "../config/db";
import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import JWT from 'jsonwebtoken';
import { errorHandler } from '../utils/error';

const signupPost = async (req: Request, res: Response) => {
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

    return res.status(200).send({ success: true });
  } catch (error: any) {
    console.error('Error during signup:', error);
    next(error)
  
  }
};

const loginPost = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log("request recieved")

  try {
    const { email, password } = req.body;
    const query = `SELECT email, password FROM users WHERE email = $1`;
    const result = await client.query(query, [email]);
    console.log("result:::", result);

    if (result.rows.length === 0) {
      return next(errorHandler(404, 'User not found'));
    }

    const validUser = result.rows[0];

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Wrong password'));
    }

    const token = JWT.sign({ id: validUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    return res.status(200).send({ success: true, message: "Login successful", token });
  } catch (error: any) {
    console.error('Error during login:', error);
    return next(errorHandler(500, 'Internal server error'));
  }
}

const logoutGet = (req: any, res: any) => {
  console.log('vannu');

  res.clearCookie('acess_token').status(200).json('logout sucess')
  console.log('logout sucess');

}


export default { signupPost, loginPost, logoutGet };
function next(arg0: Error) {
  throw new Error("Function not implemented.");
}

