import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { LogController } from "../controllers/reservation-logs.controller";

const logRouter = express.Router();
const logController = new LogController();

//예약 로그 목록 조회API [관리자]

logRouter.get(
  "/reservation-logs",
  authMiddleware,
  adminMiddleware,
  logController.getLogs
);

export default logRouter;
