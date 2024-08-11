"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const env_constant_1 = require("../constant/env.constant");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: env_constant_1.AWS_ACCESS_KEY_ID,
    secretAccessKey: env_constant_1.AWS_SECRET_ACCESS_KEY,
    region: env_constant_1.AWS_REGION,
});
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: s3,
        bucket: env_constant_1.S3_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, `uploads/${Date.now().toString()}_${file.originalname}`);
        },
    }),
});
exports.default = upload;
