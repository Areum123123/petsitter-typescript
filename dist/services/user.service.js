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
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.getUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserById(userId);
            if (!user) {
                throw new Error("사용자를 찾을 수 없습니다.");
            }
            return user;
        });
        this.updateUser = (userId, updateData) => __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.userRepository.updateUser(userId, updateData);
            return updatedUser;
        });
        // updateUserImage = async (userId: number, imageUrl: string) => {
        //   return this.userRepository.updateImage(userId, { image_url: imageUrl });
        // };
        // uploadImage = async (userId: number, imageUrl: string) => {
        //   return await this.userRepository.uploadImage(userId, imageUrl);
        // };
    }
}
exports.UserService = UserService;
