import jwt from "jsonwebtoken";
import User from "../model/usermodel.js";

const secureRoute = async (req, res, next) => {
  let token;

  // 1️⃣ Check cookie first
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // 2️⃣ Check Authorization header
  const authHeader = req.headers.authorization;
  if (!token && authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  console.log("Final token:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No Token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("Error in secureRoute:", error.message);
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

export default secureRoute;