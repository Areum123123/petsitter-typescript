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
exports.default = default_1;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_util_js_1 = require("../utils/prisma.util.js");
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const authorization = req.headers["authorization"];
            if (!authorization)
                throw new Error("인증 정보가 없습니다.");
            const [tokenType, token] = authorization.split(" ");
            if (tokenType !== "Bearer")
                throw new Error("지원하지 않는 인증 방식입니다.");
            // JwtPayload를 extends한 DecodedToken 타입을 사용
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
            const userId = decodedToken.id;
            const user = yield prisma_util_js_1.prisma.users.findFirst({
                where: { id: +userId },
            });
            if (!user) {
                throw new Error("인증 정보와 일치하는 사용자가 없습니다.");
            }
            req.user = user;
            next();
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({ message: "인증 정보가 만료되었습니다." });
            }
            else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(401).json({ message: "인증정보가 유효하지 않습니다." });
            }
            else {
                return res.status(401).json({
                    message: (_a = err.message) !== null && _a !== void 0 ? _a : "인증 정보가 유효하지 않습니다.",
                });
            }
        }
    });
}
