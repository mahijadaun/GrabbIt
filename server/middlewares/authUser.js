import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized: No Token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?.id) {
            return res.json({ success: false, message: "Invalid Token" });
        }

        // ✅ Properly attach userId to request object
        req.userId = decoded.id;

        next();
    } catch (error) {
        console.error("JWT Decode Error:", error.message);
        return res.json({ success: false, message: "Invalid or expired token" });
    }
};

export default authUser;
