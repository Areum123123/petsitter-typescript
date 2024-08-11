import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { signUpValidator } from "../validators/sign-up.validator";
import { signInValidator } from "../validators/sign-in.validator";
import { requireRefreshToken } from "../middlewares/refresh-token.middleware";

const authRouter = express.Router();
const authController = new AuthController(); //AuthController를 인스터화 시킨다.

//회원가입
authRouter.post("/sign-up", signUpValidator, authController.register);

//로그인 API
authRouter.post("/sign-in", signInValidator, authController.login);

//토큰 재발급 API
authRouter.post("/token", requireRefreshToken, authController.refreshToken);

//로그아웃 API
authRouter.post("/sign-out", requireRefreshToken, authController.logout);

export default authRouter;
