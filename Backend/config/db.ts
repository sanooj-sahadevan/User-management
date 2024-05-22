import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'myuser',
  password: 'Babygirl@123',
  database: 'usermanagement',
});

export default pool;
