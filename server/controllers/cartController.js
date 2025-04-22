import User from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId;

    if (!cartItems) {
      return res.status(400).json({ success: false, message: "Cart items are missing" });
    }

    const user = await User.findByIdAndUpdate(userId, { cartItems }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("cartItems");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, cartItems: user.cartItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
