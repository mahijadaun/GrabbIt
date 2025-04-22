import express from "express";
import { updateCart, getCart } from "../controllers/cartController.js"
import authUser from "../middlewares/authUser.js";  // Update middleware import

const cartRouter = express.Router();

// POST - Update cart items
cartRouter.post("/update", authUser, updateCart);

// GET - Optional: Get current cart items (if needed in future)
cartRouter.get("/get", authUser, getCart);

export default cartRouter;
