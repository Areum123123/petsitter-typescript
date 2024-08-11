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
exports.PetsitterRepository = void 0;
const prisma_util_js_1 = require("../utils/prisma.util.js");
class PetsitterRepository {
    constructor() {
        this.findAllPetsitters = (whereObjec) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_js_1.prisma.petsitters.findMany({
                where: whereObjec,
                orderBy: { created_at: "desc" },
            });
        });
        this.findPetsittersById = (petSitterId) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_js_1.prisma.petsitters.findUnique({
                where: { id: petSitterId },
            });
        });
        this.createReview = (userId, petSitterId, rating, comment) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_js_1.prisma.reviews.create({
                data: {
                    user_id: userId,
                    pet_sitter_id: petSitterId,
                    rating,
                    comment,
                },
                include: {
                    users: {
                        select: { name: true },
                    },
                },
            });
        });
        //펫시터 리뷰
        this.getPetsitter = (petSitterId) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_js_1.prisma.petsitters.findUnique({
                where: {
                    id: +petSitterId,
                },
            });
        });
        this.getReviewByPetsitterId = (petSitterId) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_js_1.prisma.reviews.findMany({
                where: { pet_sitter_id: +petSitterId },
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    pet_sitter_id: true,
                    users: {
                        select: {
                            name: true,
                        },
                    },
                    rating: true,
                    comment: true,
                    created_at: true,
                    updated_at: true,
                },
            });
        });
    }
}
exports.PetsitterRepository = PetsitterRepository;
