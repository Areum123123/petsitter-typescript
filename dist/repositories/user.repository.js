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
exports.UserRepository = void 0;
const prisma_util_js_1 = require("../utils/prisma.util.js");
class UserRepository {
    constructor() {
        this.findUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_js_1.prisma.users.findFirst({
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
        });
        this.updateUser = (userId, updateData) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_js_1.prisma.users.update({
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
        });
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
}
exports.UserRepository = UserRepository;
