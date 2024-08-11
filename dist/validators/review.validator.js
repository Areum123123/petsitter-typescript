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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// 리뷰 작성 유효성 검사 스키마
const reviewSchema = joi_1.default.object({
    rating: joi_1.default.number().integer().min(1).max(5).required().messages({
        "number.base": "평점은 숫자여야 합니다.",
        "number.integer": "평점은 정수여야 합니다.",
        "number.min": "평점은 1에서 5 사이여야 합니다.",
        "number.max": "평점은 1에서 5 사이여야 합니다.",
        "any.required": "평점은 필수 입력 사항입니다.",
    }),
    comment: joi_1.default.string().min(5).max(200).required().messages({
        "string.base": "리뷰 내용은 문자열이어야 합니다.",
        "string.min": "리뷰 내용은 최소 5자 이상이어야 합니다.",
        "string.max": "리뷰 내용은 최대 200자 이하이어야 합니다.",
        "any.required": "리뷰 내용은 필수 입력 사항입니다.",
        "string.empty": "리뷰 내용은 필수 입력 사항입니다.",
    }),
});
const reviewValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield reviewSchema.validateAsync(req.body, { abortEarly: false });
        next();
    }
    catch (error) {
        if (error instanceof joi_1.default.ValidationError) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(", ");
            return res.status(400).json({ message: errorMessage });
        }
    }
});
exports.reviewValidator = reviewValidator;
