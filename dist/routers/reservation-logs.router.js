"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const admin_middleware_1 = require("../middlewares/admin.middleware");
const reservation_logs_controller_1 = require("../controllers/reservation-logs.controller");
const logRouter = express_1.default.Router();
const logController = new reservation_logs_controller_1.LogController();
//예약 로그 목록 조회API [관리자]
logRouter.get("/reservation-logs", auth_middleware_1.default, admin_middleware_1.adminMiddleware, logController.getLogs);
exports.default = logRouter;
