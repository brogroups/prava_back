import { NextFunction, Request, Response } from "express";
import UserModel from "../modules/user/user.model";

const IsAdminMiddlware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req?.user?.id);

    if (!user || user?.role != "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return next()
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

export default IsAdminMiddlware