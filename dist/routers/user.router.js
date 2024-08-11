"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const update_user_validator_1 = require("../validators/update-user.validator");
const s3_upload_1 = __importDefault(require("../config/s3-upload"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
const userController = new user_controller_1.UserController();
//내정보 조회
userRouter.get("/me", auth_middleware_1.default, userController.getMe);
//내 정보 수정 API
userRouter.patch("/me", auth_middleware_1.default, update_user_validator_1.updateUserValidator, userController.updateMe);
//s3 유저 이미지 업로드 API
userRouter.post("/me/upload-images", auth_middleware_1.default, s3_upload_1.default.single("image"), userController.uploadImage);
exports.default = userRouter;
