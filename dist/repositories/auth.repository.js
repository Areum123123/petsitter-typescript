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
exports.AuthRepository = void 0;
const prisma_util_1 = require("../utils/prisma.util");
class AuthRepository {
    constructor() {
        // 회원가입
        this.register = (email, hashedPassword, name, phone_number, address) => __awaiter(this, void 0, void 0, function* () {
            const registered = yield prisma_util_1.prisma.users.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    phone_number,
                    address,
                },
            });
            return registered;
        });
        // 이메일로 사용자 조회
        this.findUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_util_1.prisma.users.findFirst({
                where: { email },
            });
            return user;
        });
        //토큰 재발급
        this.upsertRefreshToken = (userId, hashedRefreshToken) => __awaiter(this, void 0, void 0, function* () {
            yield prisma_util_1.prisma.refresh_tokens.upsert({
                where: { user_id: +userId },
                update: {
                    refresh_token: hashedRefreshToken,
                },
                create: {
                    user_id: +userId,
                    refresh_token: hashedRefreshToken,
                },
            });
        });
        //로그아웃
        this.logout = (userId) => __awaiter(this, void 0, void 0, function* () {
            yield prisma_util_1.prisma.refresh_tokens.delete({
                where: { user_id: +userId },
            });
        });
    }
}
exports.AuthRepository = AuthRepository;
