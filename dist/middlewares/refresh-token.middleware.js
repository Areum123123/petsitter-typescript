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
exports.requireRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_util_1 = require("../utils/prisma.util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_constant_1 = require("../constant/env.constant");
const requireRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 인증정보 파싱 (req.headers.authorization을 가지고 오겠다)
        const authorization = req.headers.authorization;
        console.log("Authorization header:", authorization);
        // authorization이 없는 경우
        if (!authorization) {
            return res.status(401).json({
                status: 401,
                message: "인증 정보가 없습니다.",
            });
        }
        // JWT 표준 인증 형태와 일치하지 않는 경우
        const [tokenType, refreshToken] = authorization.split(" ");
        if (tokenType !== "Bearer") {
            return res.status(401).json({
                status: 401,
                message: "지원하지 않는 인증 방식입니다.",
            });
        }
        // refreshToken이 없는 경우
        if (!refreshToken) {
            return res.status(401).json({
                status: 401,
                message: "인증 정보가 없습니다.",
            });
        }
        // 페이로드를 가져와서 할당할 것임
        let payload;
        try {
            payload = jsonwebtoken_1.default.verify(refreshToken, env_constant_1.REFRESH_TOKEN_SECRET_KEY);
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({
                    status: 401,
                    message: "인증 정보가 만료되었습니다.",
                });
            }
            else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(401).json({
                    status: 401,
                    message: "인증 정보가 유효하지 않습니다.",
                });
            }
            else {
                return res.status(500).json({
                    status: 500,
                    message: "서버 내부 오류입니다.",
                });
            }
        }
        const { id } = payload;
        // DB에서 RefreshToken을 조회
        const existedRefreshToken = yield prisma_util_1.prisma.refresh_tokens.findFirst({
            where: {
                user_id: id,
            },
        });
        // 넘겨 받은 RefreshToken과 비교
        const isValidRefreshToken = (existedRefreshToken === null || existedRefreshToken === void 0 ? void 0 : existedRefreshToken.refresh_token) &&
            bcrypt_1.default.compareSync(refreshToken, existedRefreshToken.refresh_token || "");
        console.log("Existed Refresh Token:", existedRefreshToken);
        console.log("Is valid refresh token:", isValidRefreshToken);
        if (!isValidRefreshToken) {
            return res.status(401).json({
                status: 401,
                message: "폐기된 인증 정보입니다.",
            });
        }
        // payload에 담긴 사용자 ID와 일치하는 사용자가 없는 경우
        const user = yield prisma_util_1.prisma.users.findUnique({
            where: { id },
        });
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: "인증 정보와 일치하는 사용자가 없습니다.",
            });
        }
        // req.user에 조회된 사용자 정보를 담고, 다음 동작을 진행합니다.
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.requireRefreshToken = requireRefreshToken;
