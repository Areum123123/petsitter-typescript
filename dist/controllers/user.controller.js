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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        // 사용자 정보를 가져오는 메서드
        this.getMe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                res.status(401).json({ status: 401, message: "사용자 ID가 없습니다." });
                return;
            }
            try {
                const user = yield this.userService.getUserById(userId);
                res.status(200).json({
                    status: 200,
                    message: "내 정보 조회에 성공했습니다",
                    data: user,
                });
            }
            catch (err) {
                next(err);
            }
        });
        // 사용자 정보를 업데이트하는 메서드
        this.updateMe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { phone_number, address } = req.body;
            if (!userId) {
                res.status(401).json({ status: 401, message: "사용자 ID가 없습니다." });
                return;
            }
            try {
                const users = yield this.userService.getUserById(userId);
                if (!users) {
                    res
                        .status(404)
                        .json({ status: 404, message: "사용자를 찾을 수 없습니다." });
                    return;
                }
                const updateData = {
                    phone_number: phone_number || users.phone_number,
                    address: address || users.address,
                };
                // phone_number,
                // address
                const updatedUser = yield this.userService.updateUser(userId, updateData);
                res.status(200).json({
                    status: 200,
                    message: "회원 정보가 성공적으로 수정되었습니다",
                    data: updatedUser,
                });
            }
            catch (err) {
                next(err);
            }
        });
        // 사용자 이미지를 업로드하는 메서드
    }
}
exports.UserController = UserController;
