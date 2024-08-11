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
exports.LogService = void 0;
const reservation_logs_repository_1 = require("../repositories/reservation-logs.repository");
class LogService {
    constructor() {
        this.logRepository = new reservation_logs_repository_1.LogRepository();
        this.getLogs = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.logRepository.getLogs();
            return result;
        });
    }
}
exports.LogService = LogService;
