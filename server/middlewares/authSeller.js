import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: 'Not Authorized: No Token' });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({ success: false, message: 'Invalid seller token' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Decode Error:", error.message);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authSeller;
