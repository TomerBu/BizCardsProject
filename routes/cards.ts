import { Router } from "express";
import { Card } from "../db/model/card.model";
import { verifyToken } from "../middleware/verify-token";

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

//Get my cards
router.get("/my-cards", verifyToken, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    
    const cards = await Card.find({ user_id: userId });
    res.json(cards);
  } catch (e) {
    next(e);
  }
});

export default router;
