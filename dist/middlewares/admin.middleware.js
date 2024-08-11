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
exports.adminMiddleware = void 0;
const prisma_util_1 = require("../utils/prisma.util"); // 경로 확인 필요
const client_1 = require("@prisma/client"); // Prisma에서 정의된 Role 타입 가져오기
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        if (!userId) {
            return res
                .status(401)
                .json({ status: 401, message: "사용자 ID가 없습니다." });
        }
        const user = yield prisma_util_1.prisma.users.findFirst({
            where: { id: userId },
        });
        if (!user || user.role !== client_1.Role.ADMIN) {
            return res.status(403).json({
                status: 403,
                message: "해당 작업에 대한 권한이 없습니다.",
            });
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.adminMiddleware = adminMiddleware;
