import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import IsAdminMiddlware from "../../middlewares/is_admin.middleware";
import {
  CreateEarnMoeny,
  DeleteEarnMoneyById,
  getEarnMoney,
  getEarnMoneyById,
  updateEarnMoneyById,
} from "./controller";
import { validate } from "../../middlewares/validation.middleware";
import CreateEarnMoneyDto from "./dto/create";
import UpdateEarnMoneyDto from "./dto/update";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  IsAdminMiddlware,
  validate(CreateEarnMoneyDto),
  CreateEarnMoeny
);
router.get("/findall", authMiddleware, getEarnMoney);
router.get("/:id", authMiddleware, getEarnMoneyById);
router.put(
  "/:id",
  authMiddleware,
  IsAdminMiddlware,
  validate(UpdateEarnMoneyDto),
  updateEarnMoneyById
);
router.delete(
  "/:id",
  authMiddleware,
  IsAdminMiddlware,
  DeleteEarnMoneyById
);

export default router;
