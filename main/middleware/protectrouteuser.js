import jwt from "jsonwebtoken";
import User from "../model/user.login.model.js";

const protectroute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        console.log("Token received:", token);

        if (!token) {
            return res.status(401).json({ error: "Access denied, no token provided" });
        }

        const decoded = jwt.verify(token, process.env.secret_code);
        console.log("Decoded Token Data:", decoded);
        if (!decoded) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const user = await User.findById(decoded.user_id).select("-password");
        console.log("User Found in DB:", user); 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // Attach user data to request
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ error: "Not authorized" });
    }
};

export default protectroute;
