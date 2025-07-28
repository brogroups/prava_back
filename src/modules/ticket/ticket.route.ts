import { Router } from "express";
import IsAdminMiddlware from "../../middlewares/is_admin.middleware";
import {
  CreateTikcet,
  deleteTicketById,
  getTicketById,
  getTickets,
  updateTicketById,
} from "./ticket.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import upload from "../../configs/multer";

const TicketRouter = Router();

TicketRouter.post(
  "/create",
  authMiddleware,
  IsAdminMiddlware,
  upload.single("imgUrl"),
  CreateTikcet
);

TicketRouter.get("/findall", authMiddleware, getTickets);
TicketRouter.get("/find/:id", authMiddleware, getTicketById);

TicketRouter.put(
  "/update/:id",
  authMiddleware,
  IsAdminMiddlware,
  upload.single("imgUrl"),
  updateTicketById
);

TicketRouter.delete(
  "/delete/:id",
  authMiddleware,
  IsAdminMiddlware,
  deleteTicketById
);

export default TicketRouter;
