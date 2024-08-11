"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const review_controller_1 = require("../controllers/review.controller");
const review_validator_1 = require("../validators/review.validator");
const reviewRouter = express_1.default.Router();
const reviewController = new review_controller_1.ReviewController();
//본인 리뷰 조회 API(목록)
reviewRouter.get("/my", auth_middleware_1.default, reviewController.myReview);
//리뷰 수정 API
reviewRouter.patch("/:reviewId", auth_middleware_1.default, review_validator_1.reviewValidator, reviewController.updateReview);
//리뷰 삭제 API
reviewRouter.delete("/:reviewId", auth_middleware_1.default, reviewController.deleteReview);
exports.default = reviewRouter;
