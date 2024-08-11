import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { updateUser, UserTable } from "../models/auth"; // 사용되는 User 타입이 정의된 파일에서 import

export class UserController {
  private userService = new UserService();

  // 사용자 정보를 가져오는 메서드
  getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ status: 401, message: "사용자 ID가 없습니다." });
      return;
    }

    try {
      const user = await this.userService.getUserById(userId);

      res.status(200).json({
        status: 200,
        message: "내 정보 조회에 성공했습니다",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  // 사용자 정보를 업데이트하는 메서드
  updateMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const userId = req.user?.id;
    const { phone_number, address }: updateUser = req.body;

    if (!userId) {
      res.status(401).json({ status: 401, message: "사용자 ID가 없습니다." });
      return;
    }

    try {
      const users = await this.userService.getUserById(userId);

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
      const updatedUser = await this.userService.updateUser(userId, updateData);

      res.status(200).json({
        status: 200,
        message: "회원 정보가 성공적으로 수정되었습니다",
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  // 사용자 이미지를 업로드하는 메서드
  uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const userId = req.user?.id;
    const fileData = req.file; //as Express.Multer.File | undefined;

    if (!userId) {
      res
        .status(404)
        .json({ status: 404, message: "사용자를 찾을 수 없습니다." });
      return;
    }
    if (!fileData || !("location" in fileData)) {
      return res.status(400).json({ error: "파일을 업로드 해주세요." });
    }
    // fileData의 filename 속성을 사용할 때
    const fileUrl: string = fileData.location as string; // 파일 이름을 string으로 타입 단언

    try {
      const updatedUser = await this.userService.uploadImage(userId, fileUrl);

      res.status(200).json({
        status: 200,
        message: "이미지업로드 성공!",
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };
}
