import { client } from "../config/db";
// import { signupValidator } from "../helpers/formValidations";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";



// type DecodedJWT = {
//     email: string;
//     iat: number;
//     exp: number;
//   };


const signupPost = async (req: any, res: any) => {
  try {


    // const jsonData = [{ name: "Sanooj", age: 24 }, { name: "Srirag", age: 24 }, { name: "Riyaz", age: 24 }];
    // res.json(jsonData);


    const { username, email, phone, password } = req.body;

    try {
      const encryptedPassword = bcrypt.hashSync(password, 10);
      await client.connect();
      const query = `INSERT INTO users (username, email, phone, password) 
          VALUES ($1, $2, $3, $4)`;
      await client.query(query, [username, email, phone, encryptedPassword]);
    } catch (error: any) {
      if (error.code === "23505") {
        return res
          .status(403)
          .send({ success: false, message: "Credentials already exists" });
      }
    }
    finally {
      await client.end();
    }

    //   Creating a JWT token and sending it in the body
    //   const userJWT = jwt.sign({ email }, String(process.env.JWT_KEY), {
    //     expiresIn: "1h",
    //   });
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export = signupPost