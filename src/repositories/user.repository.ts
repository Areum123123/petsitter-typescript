import { updateUser, resultUpdateUser, FindUser } from "../models/auth.js";
import { prisma } from "../utils/prisma.util.js";

export class UserRepository {
  findUserById = async (userId: Number): Promise<FindUser | null> => {
    return await prisma.users.findFirst({
      where: { id: +userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone_number: true,
        address: true,
        role: true,
        image_url: true,
        created_at: true,
        updated_at: true,
      },
    });
  };

  updateUser = async (
    userId: number,
    updateData: updateUser
  ): Promise<resultUpdateUser> => {
    return await prisma.users.update({
      where: { id: +userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        phone_number: true,
        address: true,
        updated_at: true,
      },
    });
  };

  //이미지업로드
  uploadImage = async (
    userId: number,
    fileUrl: string
  ): Promise<{ image_url: string | null }> => {
    return await prisma.users.update({
      where: { id: +userId },
      data: { image_url: fileUrl },
      select: {
        image_url: true,
      },
    });
  };
}
