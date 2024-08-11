"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const reservation_logs_service_1 = require("../services/reservation-logs.service");
class LogController {
    constructor() {
        this.logService = new reservation_logs_service_1.LogService();
        this.getLogs = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reservationLogs = yield this.logService.getLogs();
                return res.status(200).json({
                    status: 200,
                    message: "예약 로그 목록 조회 성공!",
                    data: reservationLogs,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.LogController = LogController;
