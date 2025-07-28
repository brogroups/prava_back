import { Request, Response } from "express";
import EarnMoneyModel from "./model";

export const CreateEarnMoeny = async (req: Request, res: Response) => {
  try {
    const earn_money = await EarnMoneyModel.create(req.body);

    return res.status(201).json({ message: "created", earn_money });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEarnMoney = async (req: Request, res: Response) => {
  try {
    const earn_moneys = await EarnMoneyModel.find({});

    return res.status(200).json({ message: "lisr of earn money", earn_moneys });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getEarnMoneyById = async (req: Request, res: Response) => {
  try {
    const earn_money = await EarnMoneyModel.findById(req.params.id);

    if (!earn_money) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json({ message: "earn money", earn_money });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEarnMoneyById = async (req: Request, res: Response) => {
  try {
    const earn_money = await EarnMoneyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!earn_money) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json({ message: "updated earn money", earn_money });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const DeleteEarnMoneyById = async (req: Request, res: Response) => {
  try {
    const earn_money = await EarnMoneyModel.findByIdAndDelete(
      req.params.id,
    );

    if (!earn_money) {
      return res.status(404).json({ message: "not found" });
    }

    return res.status(200).json({ message: "deleted earn money", earn_money });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};
