import jwt from "jsonwebtoken";
import { Request, Response } from 'express';
import { client } from "../config/db";
// import { signupValidator } from "../helpers/formValidations";
import bcrypt from "bcryptjs";

type DecodedJWT = {
  email: string;
  iat: number;
  exp: number;
};

type Row = {
  id: string;
  username: string;
  email: string;
  phone: string;
};

const adminLoginPost = async (req:any, res:any) => {
  try {
    const { email, password } = req.body;

    const emailMatch = email == process.env.ADMIN_EMAIL;
    const passMatch = password == process.env.ADMIN_PASS;

    if (emailMatch && passMatch) {
      const adminJWT = jwt.sign({ email }, String(process.env.JWT_KEY), {
        expiresIn: "1h",
      });

      res.status(200).send({ success: true, adminJWT });
    } else {
      res
        .status(401)
        .send({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
}


 const  adminDashboardData = async (req: any, res: any) => {
    try {
 
      const query = `SELECT id,username,email,phone FROM users`;
      const dashboardData: { rows: Row[] } = await client.query(query);

      res
        .status(200)
        .send({ success: true, dashboardData: dashboardData?.rows });
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: "Failed to fetch data from db" });
    }
  
  }
  const editUser = async (req: any, res: any) => {
    try {
        console.log('1');
        
        const { id } = req.params;      
        const { username, email, phone } = req.body;
        console.log('Request params:', req.params);
        console.log('Request body before update:', req.body);
    
        // Check if username or email already exists
        const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const checkResult = await client.query(checkQuery, [username, email]);
    
        if (checkResult.rows.length > 0) {
            return res.status(208).send({ success: false, message: 'Username or email already exists' });
        }
    
        // Proceed with the update if username or email doesn't exist
        const updateQuery = 'UPDATE users SET username = $1, email = $2, phone = $3 WHERE id = $4';
        await client.query(updateQuery, [username, email, phone, id]);
        console.log('Executed query:', updateQuery);
        console.log('Updated values:', { username, email, phone });
    
        res.status(200).send({ success: true });
    } catch (error: any) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'An error occurred' });
    }
};

  


 const  deleteUser = async (req: any, res: any) => {
    try {
      const { id } = req.params;
console.log(req.params+'req');

      const query = `DELETE FROM users WHERE id= $1`;
      await client.query(query, [id]);

      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
    }
  }




  const addUser = async (req: Request, res: Response) => {
    try {
      console.log('Request received');
  
      const { username, email, phone, password } = req.body;
      console.log('Request body:', req.body);
  
      // Encrypt the password
      const encryptedPassword = bcrypt.hashSync(password, 10);
      console.log('Encrypted password:', encryptedPassword);
  
      // Insert user into the database
      const query = `INSERT INTO users (username, email, phone, password) 
                     VALUES ($1, $2, $3, $4) RETURNING *`;
      const values = [username, email, phone, encryptedPassword];
  
      const result = await client.query(query, values);
      console.log('Inserted user:', result.rows[0]);
  
      res.status(200).send({ success: true, user: result.rows[0] });
    } catch (error: any) {
      console.error('Error inserting user:', error);
  
      if (error.code === "23505") { // Unique violation
        res.status(208).send({ success: false, message: "Credentials already exists" });
      } else {
        res.status(500).send({ success: false, message: "Internal Server Error" });
      }
    }
  };

 const  verifyAdmin =  async (req: any, res: any) => {
    try {

      console.log('verity admin');
      
      const { adminJWT } = req.body;
      const verifyJWT = jwt.verify(
        adminJWT,
        String(process.env.JWT_KEY)
      ) as DecodedJWT;

      if (verifyJWT.email !== process.env.ADMIN_EMAIL) {
        return res
          .status(401)
          .send({ success: false, message: "Admin JWT failed to verify" });
      }
      return res
        .status(200)
        .send({ success: true, message: "Admin JWT verified successfully" });
    } catch (error: any) {
      if (error?.message === "invalid signature") {
        res
          .status(401)
          .send({ success: false, message: "Admin JWT failed to verify" });
      }
    }
  }








  export default { adminLoginPost,adminDashboardData,editUser ,addUser,deleteUser,verifyAdmin};
