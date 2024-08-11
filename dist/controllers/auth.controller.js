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
exports.AuthController = void 0;
//import { AuthRepository } from '../repositories/auth.repository';
const auth_service_1 = require("../services/auth.service");
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService(); // AuthService 클래스 타입
        //   private authService: AuthService; // AuthService 클래스 타입
        //   constructor() {
        //     this.authService = new AuthService();
        //   }
        // 회원가입 API
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, name, phone_number, address } = req.body;
                // AuthService의 register 메소드 호출
                const registered = yield this.authService.register(email, password, name, phone_number, address);
                // 성공적인 회원가입 응답 반환
                return res.status(201).json({
                    status: 201,
                    message: "회원 가입이 성공적으로 완료되었습니다.",
                });
            }
            catch (err) {
                // 에러 핸들링 미들웨어로 전달
                next(err);
            }
        });
        //로그인
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const { accessToken, refreshToken } = yield this.authService.login(email, password);
                return res.status(200).json({
                    status: 200,
                    message: "로그인 성공했습니다.",
                    accessToken,
                    refreshToken,
                });
            }
            catch (err) {
                next(err);
            }
        });
        //토큰재발급
        this.refreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // req.user가 undefined인지 확인
            if (!req.user) {
                return res.status(401).json({
                    status: 401,
                    message: "사용자 정보가 없습니다.",
                });
            }
            const userId = req.user.id;
            try {
                const tokens = yield this.authService.refreshToken(+userId);
                return res.status(200).json(Object.assign({ status: 200, message: "토큰 재발급에 성공했습니다." }, tokens));
            }
            catch (err) {
                next(err);
            }
        });
        //로그아웃
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // req.user가 undefined인지 확인
            if (!req.user) {
                return res.status(401).json({
                    status: 401,
                    message: "사용자 정보가 없습니다.",
                });
            }
            const userId = req.user.id;
            try {
                const logout = yield this.authService.logout(userId);
                return res.status(200).json({
                    status: 200,
                    message: "로그아웃 되었습니다.",
                    ID: `${userId}`,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.AuthController = AuthController;
