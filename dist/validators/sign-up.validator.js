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
exports.signUpValidator = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi 스키마 정의
const signUpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "any.required": "이메일을 입력해주세요",
        "string.email": "이메일 형식이 올바르지 않습니다.",
        "string.empty": "이메일을 입력해 주세요",
    }),
    password: joi_1.default.string().min(6).required().messages({
        "string.min": "비밀번호는 최소 6자리 이상이어야 합니다.",
        "any.required": "비밀번호를 입력해주세요.",
        "string.empty": "비밀번호를 입력해주세요.",
    }),
    confirmPassword: joi_1.default.any().valid(joi_1.default.ref("password")).required().messages({
        "any.only": "비밀번호가 일치하지 않습니다.",
        "any.required": "비밀번호 확인을 입력해주세요",
        "string.empty": "비밀번호를 확인을 입력해주세요.",
    }),
    name: joi_1.default.string().min(2).max(30).required().messages({
        "string.base": "이름은 문자열이어야 합니다.",
        "string.empty": "이름을 입력해주세요.",
        "any.required": "이름을 입력해주세요.",
        "string.min": "이름은 최소 2글자 이상이어야 합니다.",
        "string.max": "이름은 최대 30글자 이하여야 합니다.",
    }),
    phone_number: joi_1.default.string()
        .pattern(/^[0-9]{9,11}$/) // 전화번호 9자리에서 11자리까지 허용
        .required()
        .messages({
        "string.pattern.base": "유효한 전화번호를 입력해주세요.",
        "any.required": "전화번호를 입력해주세요.",
        "string.empty": "전화번호를 입력해주세요.",
    }),
    address: joi_1.default.string()
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
// 미들웨어 함수 정의
const signUpValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield signUpSchema.validateAsync(req.body, { abortEarly: false });
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
exports.signUpValidator = signUpValidator;
