import { Router } from "express";

// use the Router function to build a router object
const router = Router();

router.get("/", (req, res) => {
  res.json({ books: [] });
});

export default router;
