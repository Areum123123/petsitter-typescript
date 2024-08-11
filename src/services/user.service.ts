import { updateUser, UserTable } from "../models/auth.js";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository = new UserRepository();

  getUserById = async (userId: Number): Promise<UserTable | null> => {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }
    return user;
  };

  updateUser = async (userId: number, updateData: updateUser) => {
    const updatedUser = await this.userRepository.updateUser(
      userId,
      updateData
    );

    return updatedUser;
  };

  uploadImage = async (userId: number, fileUrl: string) => {
    return await this.userRepository.uploadImage(userId, fileUrl);
  };
}
