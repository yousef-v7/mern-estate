import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
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
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(401, "Invalid credentials"));

    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!isPasswordValid) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    validUser.password = undefined; // hide password from sending bakk to client

    res
      .cookie("access_token", token, { httpOnly: true, secure: true })
      .status(200)
      .json({
        message: "Signin successful",
        user: validUser,
      });
  } catch (err) {
    next(err);
  }
};
