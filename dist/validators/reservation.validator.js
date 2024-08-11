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
exports.reservationValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const reservationSchema = joi_1.default.object({
    pet_sitter_id: joi_1.default.number().integer().positive().required().messages({
        "number.base": "펫시터 ID를 입력해주세요.",
        "number.integer": "펫시터 ID는 정수여야 합니다.",
        "number.positive": "펫시터 ID는 양수여야 합니다.",
        "any.required": "펫시터 ID를 입력해주세요.",
    }),
    dog_name: joi_1.default.string().min(1).required().messages({
        "string.base": "개의 이름은 문자열이어야 합니다.",
        "string.empty": "개의 이름을 입력해주세요.",
        "any.required": "개의 이름을 입력해주세요.",
    }),
    dog_breed: joi_1.default.string().min(1).required().messages({
        "string.base": "개의 품종은 문자열이어야 합니다.",
        "string.empty": "개의 품종을 입력해주세요.",
        "any.required": "개의 품종을 입력해주세요.",
    }),
    dog_age: joi_1.default.string().min(1).required().messages({
        "string.base": "개의 나이는 문자열이어야 합니다.",
        "string.empty": "개의 나이를 입력해주세요.",
        "any.required": "개의 나이를 입력해주세요.",
    }),
    dog_weight: joi_1.default.string().min(1).required().messages({
        "string.base": "개의 체중은 문자열이어야 합니다.",
        "string.empty": "개의 체중을 입력해주세요.",
        "any.required": "개의 체중을 입력해주세요.",
    }),
    request_details: joi_1.default.string().allow("").optional().messages({
        "string.base": "요청 세부 사항은 문자열이어야 합니다.",
    }),
    booking_date: joi_1.default.date().iso().required().messages({
        "date.base": "예약 날짜는 유효한 날짜 형식이어야 합니다.",
        "date.isoDate": "예약 날짜는 ISO 8601 형식이어야 합니다.",
        "any.required": "예약 날짜를 입력 해주세요.",
        "string.empty": "예약 날짜는 입력 해주세요.",
    }),
});
const reservationValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield reservationSchema.validateAsync(req.body, { abortEarly: false });
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
exports.reservationValidator = reservationValidator;
