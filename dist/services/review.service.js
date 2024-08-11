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
exports.ReviewService = void 0;
const review_repository_1 = require("../repositories/review.repository");
class ReviewService {
    constructor() {
        this.reviewRepository = new review_repository_1.ReviewRepository();
        this.getMyReviews = (userId) => __awaiter(this, void 0, void 0, function* () {
            const myReviews = yield this.reviewRepository.getMyReviews(userId);
            return myReviews.map((review) => ({
                review_id: review.id,
                user_id: review.user_id,
                reviews: {
                    petsitter_name: review.petsitters.name,
                    rating: review.rating,
                    comment: review.comment,
                    created_at: review.created_at,
                    updated_at: review.updated_at,
                },
            }));
        });
        //리뷰수정
        this.updateReview = (reviewId, userId, rating, comment) => __awaiter(this, void 0, void 0, function* () {
            //리뷰찾기
            const review = yield this.reviewRepository.findReviewById(reviewId, userId);
            if (!review) {
                throw new Error("리뷰가 존재하지 않습니다.");
            }
            //찾은 리뷰 수정
            const updateData = {
                rating: rating,
                comment: comment,
            };
            const updateReview = yield this.reviewRepository.updateReview(reviewId, userId, updateData);
            const result = {
                review_id: reviewId,
                user_id: userId,
                reviews: {
                    petsitter_name: updateReview.petsitters.name,
                    rating: updateReview.rating,
                    comment: updateReview.comment,
                    created_at: updateReview.created_at,
                    updated_at: updateReview.updated_at,
                },
            };
            return result;
        });
        //리뷰삭제
        this.deleteReview = (reviewId, userId) => __awaiter(this, void 0, void 0, function* () {
            //리뷰존재여부
            const review = yield this.reviewRepository.findReviewById(reviewId, userId);
            if (!review) {
                throw new Error("리뷰가 존재하지 않습니다.");
            }
            //삭제
            yield this.reviewRepository.deleteReview(reviewId, userId);
        });
    }
}
exports.ReviewService = ReviewService;
