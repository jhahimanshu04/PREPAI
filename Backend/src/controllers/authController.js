import User from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 200 * 24 * 60 * 60 * 1000
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please Provide username, email and password"
      });
    }

    const isUserAlreadyExists = await User.findOne({ where: { email } });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "Account already exists with this email or username"
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: name,
      email,
      password: hash
    });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "200d" }
    );

    res.cookie("token", token, cookieOptions); // ✅ Fixed

    return res.status(201).json({
      message: "User registered successfully",
      token, // ✅ Token bhi send kar rahe hain
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "200d" }
    );

    res.cookie("token", token, cookieOptions); // ✅ Fixed

    return res.status(200).json({
      message: "User Logged in successfully",
      token, // ✅ Token bhi send kar rahe hain
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none" // ✅ Fixed
    });

    return res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};