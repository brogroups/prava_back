import { Request, Response } from "express";
import UserModel from "../user/user.model";
import { verify } from "argon2";
import jwt from "jsonwebtoken";

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res.status(400).json({ success: false, message: "Bad request" });
    const verifiedPassword = await verify(oldUser.password || "", password);
    if (!verifiedPassword)
      return res.status(400).json({ success: false, message: "Bad request" });

    const token = await jwt.sign(
      { id: oldUser._id },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "31d",
      }
    );

    return res
      .status(200)
      .json({ success: true, token, message: "login is successfully" });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

const SignUp = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.create({ role: "user" });
    const token = await jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || ""
    );
    return res.status(201).json({ success: true, message: "user created",token });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export { Login, SignUp };
