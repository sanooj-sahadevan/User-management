const express = require('express');
const pool = require('./config/db.ts');
import userRouter from "./routes/userRoutes";
// import adminRouter from "./routes/adminRoutes";



const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/user", userRouter);
// app.use("/admin", adminRouter);

app.get('/users', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
//  app.get('/',(req,res)=>{
//     res.json({
//         message:'Api is wroking'
//     })

//  })