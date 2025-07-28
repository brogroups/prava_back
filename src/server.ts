import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectionToDB } from "./configs/db";
import { createUser, findByLogin } from "./modules/user/user.controller";
import AuthRouter from "./modules/auth/auth.route";
import UserRouter from "./modules/user/user.route";
import TicketRouter from "./modules/ticket/ticket.route";
import EarnMoneyRouter from "./modules/earn_money/route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/ticket", TicketRouter);
app.use("/api/earn_money", EarnMoneyRouter);

(async function Start() {
  try {
    await ConnectionToDB();

    const admin = await findByLogin({ email: "admin@gmail.com" });

    if (!admin) {
      await createUser({
        username: "admin",
        email: "admin@gmail.com",
        password: "admin",
        role: "admin",
      });
      console.log("admin created");
    } else {
      console.log("there is already admin");
    }
    const PORT: number = Number(process.env.PORT) || 9000;
    app.listen(PORT, () => {
      console.log("server is running", PORT);
    });
  } catch (error) {
    console.error(error);
  }
})();
