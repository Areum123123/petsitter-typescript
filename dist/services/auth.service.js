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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_repository_1 = require("../repositories/auth.repository");
const env_constant_1 = require("../constant/env.constant");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_util_1 = require("../utils/prisma.util");
class AuthService {
    constructor() {
        this.authRepository = new auth_repository_1.AuthRepository();
        //   private authRepository: AuthRepository;
        //   constructor() {
        //     this.authRepository = new AuthRepository();
        //   }
        // 회원가입
        this.register = (email, password, name, phone_number, address) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isExistUser = yield this.authRepository.findUserByEmail(email);
                if (isExistUser) {
                    throw new Error("이미 가입 된 사용자입니다.");
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const registered = yield this.authRepository.register(email, hashedPassword, name, phone_number, address);
                return registered;
            }
            catch (err) {
                throw err;
            }
        });
        //로그인
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authRepository.findUserByEmail(email);
                if (!user) {
                    throw new Error("사용자를 찾을 수 없습니다.");
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordMatch) {
                    throw new Error("비밀번호가 일치하지 않습니다.");
                }
                //사용자에게 access token 발급
                const accessToken = jsonwebtoken_1.default.sign({
                    id: user.id,
                }, env_constant_1.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "12h" });
                //refresh토큰  발급
                const refreshToken = jsonwebtoken_1.default.sign({
                    id: user.id,
                }, env_constant_1.REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" });
                //refresh 토큰 저장(hash 값으로 저장)
                const hashedRefreshToken = bcrypt_1.default.hashSync(refreshToken, 10);
                //refresh 토큰 생성 또는 갱신 upsert() 있으면 update 없으면 create
                yield prisma_util_1.prisma.refresh_tokens.upsert({
                    where: {
                        user_id: user.id,
                    },
                    update: {
                        refresh_token: hashedRefreshToken,
                    },
                    create: {
                        user_id: user.id,
                        refresh_token: hashedRefreshToken,
                    },
                });
                return { accessToken, refreshToken };
            }
            catch (err) {
                throw err;
            }
        });
        //토큰 재발급
        this.refreshToken = (userId) => __awaiter(this, void 0, void 0, function* () {
            const payload = { id: userId };
            const accessToken = jsonwebtoken_1.default.sign(payload, env_constant_1.ACCESS_TOKEN_SECRET_KEY, {
                expiresIn: "12h",
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, env_constant_1.REFRESH_TOKEN_SECRET_KEY, {
                expiresIn: "7d",
            });
            const hashedRefreshToken = bcrypt_1.default.hashSync(refreshToken, 10);
            yield this.authRepository.upsertRefreshToken(+userId, hashedRefreshToken);
            return {
                accessToken,
                refreshToken,
            };
        });
        //로그아웃
        this.logout = (userId) => __awaiter(this, void 0, void 0, function* () {
            yield this.authRepository.logout(userId);
        });
    }
}
exports.AuthService = AuthService;
