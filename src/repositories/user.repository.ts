import { updateUser, User, UserTable } from "../models/auth.js";
import { prisma } from "../utils/prisma.util.js";

export class UserRepository {
  findUserById = async (userId: Number): Promise<UserTable | null> => {
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

  updateUser = async (userId: number, updateData: updateUser) => {
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

  //이미지
  //   updateImage = async (userId: number, updateData: Partial<UserTable>) => {
  //     return await prisma.users.update({
  //       where: { id: userId },
  //       data: updateData,
  //       select: {
  //         image_url: true,
  //       },
  //     });
  //   };
  // }
  // uploadImage = async (userId:number, imageUrl:string) => {
  //   return await prisma.users.update({
  //     where: { id: +userId },
  //     data: { image_url: imageUrl },
  //     select: {
  //       image_url: true,
  //     },
  //   });
}
