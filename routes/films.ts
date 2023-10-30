import { Router } from "express";

import connection from "../db/connection";
const router = Router();

//http://localhost:8080/api/v1/movies/
router.get("/", (req, res) => {
  connection.query("SELECT * FROM film", (dbErr, dbRes) => {
    if (dbErr) {
      return res.json(dbErr);
    }
    return res.json(dbRes);
  });
});

//http://localhost:8080/api/v1/movies/minmax?min=100&max=102
router.get("/minmax", (req, res) => {
  const min = req.query.min;
  const max = req.query.max;

  connection.query(
    "SELECT * FROM film WHERE film_id between ? AND ?",
    [min, max],
    (dbErr, dbRes) => {
      if (dbErr) {
        return res.json(dbErr);
      }
      return res.json(dbRes);
    }
  );
});

//http://localhost:8080/api/v1/movies/123
router.get("/:id", (req, res) => {
  const id = req.params.id;

  connection.query(
    "SELECT * FROM film WHERE film_id = ?",
    [id],
    (dbErr, dbRes) => {
      if (dbErr) {
        return res.json(dbErr);
      }
      return res.json(dbRes);
    }
  );
});

router.post("/", (req, res) => {
  return res.json(req.body);
});

export default router;
