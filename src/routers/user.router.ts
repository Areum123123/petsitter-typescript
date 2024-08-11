import express from "express";
import { Request } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { updateUserValidator } from "../validators/update-user.validator";
// import upload from "../config/s3-upload";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();
const userController = new UserController();

//내정보 조회
userRouter.get("/me", authMiddleware, userController.getMe);

//내 정보 수정 API
userRouter.patch(
  "/me",
  authMiddleware,
  updateUserValidator,
  userController.updateMe
);

// s3 유저 이미지 업로드 API
// userRouter.post(
//   "/me/upload-images",
//   authMiddleware,
//   upload.single("image"),
//   userController.uploadImage
// );

export default userRouter;
