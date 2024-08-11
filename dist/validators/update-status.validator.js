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
exports.updateStatusValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const updateStatusSchema = joi_1.default.object({
    new_status: joi_1.default.string()
        .valid("PENDING", "CONFIRMED", "COMPLETED", "CANCELED")
        .required()
        .messages({
        "any.required": "변경하고자 하는 예약 상태를 입력해 주세요.",
        "string.empty": "변경하고자 하는 예약 상태를 입력해 주세요.",
        "any.only": "유효하지 않은 상태 값입니다.",
    }),
    reason: joi_1.default.string().required().messages({
        "any.required": "예약 상태 변경 사유를 입력해 주세요.",
        "string.empty": "예약 상태 변경 사유를 입력해 주세요.",
    }),
});
const updateStatusValidator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield updateStatusSchema.validateAsync(req.body, { abortEarly: false });
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
exports.updateStatusValidator = updateStatusValidator;
