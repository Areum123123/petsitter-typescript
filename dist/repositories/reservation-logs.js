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
exports.LogRepository = void 0;
const prisma_util_js_1 = require("../utils/prisma.util.js");
class LogRepository {
    constructor() {
        this.getLogs = () => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_js_1.prisma.reservation_logs.findMany({
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    reservation_id: true,
                    user_id: true,
                    old_status: true,
                    new_status: true,
                    reason: true,
                    created_at: true,
                },
            });
        });
    }
}
exports.LogRepository = LogRepository;
