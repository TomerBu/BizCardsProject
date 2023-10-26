import { Router } from "express";
import mysql2 from "mysql2";

const connection = mysql2.createConnection({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  port: Number(process.env.DATABASE_PORT),
});

// use the Router function to build a router object
const router = Router();

router.get("/", (req, res) => {
  connection.query("SELECT * FROM film", (err, dbRes) => {
    res.json(dbRes);
  });
  //res.json({ books: [] });
});

export default router;
