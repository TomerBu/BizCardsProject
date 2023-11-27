import { Router } from "express";
import { Card } from "../db/model/card.model";

const router = Router();

//Get all cards
router.get("/", async (req, res, next) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

export default router;