import Address from "../models/Address.js";
// Add address
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.userId; // Use from auth

    if (!address || !userId) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    await Address.create({ ...address, userId });
    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get address
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId; // Use from auth

    const addresses = await Address.find({ userId });

    if (!addresses) {
      return res.json({ success: false, message: "No address found" });
    }

    res.json({ success: true, addresses });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
