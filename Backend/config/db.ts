// import { Client } from 'pg';

// const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     database: 'usermanagement',
//     user: 'postgres',
//     password: 'Babygirl@123'
// });

// async function connectToDatabase() {
//     try {
//         await client.connect();
//         console.log('Connected to the database');
//     } catch (err) {
//         console.error('Connection error:');
//     }
// }

// connectToDatabase();

// export default client;


import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'usermanagement',
    user: 'postgres',
    password: 'Babygirl@123'
});

export default async () => await client.connect();
