"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const sign_up_validator_1 = require("../validators/sign-up.validator");
const sign_in_validator_1 = require("../validators/sign-in.validator");
const refresh_token_middleware_1 = require("../middlewares/refresh-token.middleware");
const authRouter = express_1.default.Router();
const authController = new auth_controller_1.AuthController(); //AuthController를 인스터화 시킨다.
//회원가입
authRouter.post("/sign-up", sign_up_validator_1.signUpValidator, authController.register);
//로그인 API
authRouter.post("/sign-in", sign_in_validator_1.signInValidator, authController.login);
//토큰 재발급 API
authRouter.post("/token", refresh_token_middleware_1.requireRefreshToken, authController.refreshToken);
//로그아웃 API
authRouter.post("/sign-out", refresh_token_middleware_1.requireRefreshToken, authController.logout);
exports.default = authRouter;
