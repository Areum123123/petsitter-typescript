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
exports.signInValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const signInSchema = joi_1.default.object({
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
});
const signInValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield signInSchema.validateAsync(req.body, { abortEarly: false });
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
exports.signInValidator = signInValidator;
