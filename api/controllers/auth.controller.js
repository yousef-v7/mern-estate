import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //hashed password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    const user = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
};
