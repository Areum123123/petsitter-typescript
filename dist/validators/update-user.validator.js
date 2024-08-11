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
exports.updateUserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const updateUserSchema = joi_1.default.object({
    phone_number: joi_1.default.string()
        .allow("")
        .optional()
        .pattern(/^[0-9]{9,11}$/) //전화번호 9자리에서 11자리까지 허용
        .required()
        .messages({
        "string.pattern.base": "유효한 전화번호를 입력해주세요.",
        "any.required": "전화번호를 입력해주세요.",
        "string.empty": "전화번호를 입력해주세요.",
    }),
    address: joi_1.default.string()
        .allow("")
        .optional()
        .min(5) // 주소는 최소 5자 이상
        .max(100) // 주소는 최대 100자 이하
        .pattern(/^[a-zA-Z0-9가-힣\s,.-]+$/) // 알파벳,한글, 숫자, 공백, 쉼표, 마침표 및 대시만 허용
        .required()
        .messages({
        "string.empty": "주소를 입력해주세요.",
        "string.min": "주소는 최소 5자 이상이어야 합니다.",
        "string.max": "주소는 최대 100자 이하이어야 합니다.",
        "string.pattern.base": "주소에 유효하지 않은 문자가 포함되어 있습니다.",
        "any.required": "주소를 입력해주세요.",
    }),
});
const updateUserValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield updateUserSchema.validateAsync(req.body, { abortEarly: false });
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
exports.updateUserValidator = updateUserValidator;
