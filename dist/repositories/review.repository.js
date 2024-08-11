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
exports.ReviewRepository = void 0;
const prisma_util_1 = require("../utils/prisma.util");
class ReviewRepository {
    constructor() {
        this.getMyReviews = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_1.prisma.reviews.findMany({
                where: { user_id: +userId },
                orderBy: { created_at: "desc" },
                select: {
                    id: true,
                    user_id: true,
                    petsitters: {
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
        this.findReviewById = (reviewId, userId) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_1.prisma.reviews.findUnique({
                where: { id: +reviewId, user_id: +userId },
            });
        });
        this.updateReview = (reviewId, userId, updateData) => __awaiter(this, void 0, void 0, function* () {
            return yield prisma_util_1.prisma.reviews.update({
                where: { id: +reviewId, user_id: +userId },
                data: updateData,
                include: {
                    petsitters: {
                        select: { name: true },
                    },
                },
            });
        });
        this.deleteReview = (reviewId, userId) => __awaiter(this, void 0, void 0, function* () {
            yield prisma_util_1.prisma.reviews.delete({
                where: {
                    id: +reviewId,
                    user_id: +userId,
                },
            });
        });
    }
}
exports.ReviewRepository = ReviewRepository;
