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
exports.ReviewController = void 0;
const review_service_1 = require("../services/review.service");
class ReviewController {
    constructor() {
        this.reviewService = new review_service_1.ReviewService();
        //본인리뷰
        this.myReview = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res
                    .status(401)
                    .json({ status: 401, message: "사용자 ID가 없습니다." });
            }
            const myReviews = yield this.reviewService.getMyReviews(+userId);
            return res.status(200).json({
                status: 200,
                message: "본인 리뷰조회 성공!",
                data: myReviews,
            });
        });
        //리뷰 수정
        this.updateReview = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { reviewId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { rating, comment } = req.body;
            try {
                //리뷰찾기
                if (!userId) {
                    return res
                        .status(401)
                        .json({ status: 401, message: "사용자 ID가 없습니다." });
                }
                const updatedReview = yield this.reviewService.updateReview(+reviewId, userId, rating, comment);
                return res.status(200).json({
                    status: 200,
                    message: "펫시터 리뷰 수정 성공!",
                    data: updatedReview,
                });
            }
            catch (err) {
                next(err);
            }
        });
        //리뷰삭제
        this.deleteReview = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { reviewId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            try {
                if (!userId) {
                    return res
                        .status(401)
                        .json({ status: 401, message: "사용자 ID가 없습니다." });
                }
                //삭제
                yield this.reviewService.deleteReview(+reviewId, userId);
                return res
                    .status(200)
                    .json({ status: 200, message: "리뷰가 성공적으로 삭제되었습니다." });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ReviewController = ReviewController;
