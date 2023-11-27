import { Router } from "express";
import { Card } from "../db/model/card.model";
import { verifyToken } from "../middleware/verify-token";
import { validateCard } from "../middleware/validate-schema";
import { verifyIsBusiness } from "../middleware/verify-is-business";

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

//Post a card
router.post("/", verifyIsBusiness, validateCard, async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const card = await Card.create({ ...req.body, user_id: userId });
    res.status(201).json(card);
  } catch (e) {
    next(e);
  }
});

export default router;
