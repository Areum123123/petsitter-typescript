"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY_ID = exports.AWS_REGION = exports.S3_BUCKET_NAME = exports.REFRESH_TOKEN_SECRET_KEY = exports.ACCESS_TOKEN_SECRET_KEY = exports.PORT_NUMBER = void 0;
require("dotenv/config");
const PORT_NUMBER = process.env.PORT_NUMBER
    ? Number(process.env.PORT_NUMBER)
    : 3000;
exports.PORT_NUMBER = PORT_NUMBER;
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || "default-access-token-secret";
exports.ACCESS_TOKEN_SECRET_KEY = ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY || "default-refresh-token-secret";
exports.REFRESH_TOKEN_SECRET_KEY = REFRESH_TOKEN_SECRET_KEY;
exports.S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
exports.AWS_REGION = process.env.AWS_REGION;
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = process.env
    .AWS_SECRET_ACCESS_KEY;
