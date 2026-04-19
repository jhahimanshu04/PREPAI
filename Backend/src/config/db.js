// import pkg from "pg";
// import dotenv from "dotenv";
// const { Pool } =pkg;
// dotenv.config();
// console.log(process.env.DB_USER);
// console.log(process.env.DB_HOST);
// console.log("DB NAME:", process.env.DB_DATABASE);



// const pool =new Pool({
//     user:process.env.DB_USER,
//     host:process.env.DB_HOST,
//     database:process.env.DB_DATABASE,
//     password:process.env.DB_PASSWORD,
//     port:process.env.DB_PORT
// })
// pool.on("connect",()=>{
//     console.log("connection pool established with Database");
// })
// export default pool;


import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);
console.log("DB NAME:", process.env.DB_DATABASE);

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("DB error:", err));

export default sequelize;