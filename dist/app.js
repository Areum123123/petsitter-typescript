"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const env_constant_1 = require("./constant/env.constant");
const index_1 = __importDefault(require("./routers/index"));
const app = (0, express_1.default)();
const PORT = env_constant_1.PORT_NUMBER;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", [index_1.default]);
app.get("/", (req, res) => {
    // throw new Error('예상치 못한 에러')    //에러핸들러 잘 연결되었나 확인
    return res.status(200).send("서버가 실행중");
});
app.use(error_handler_middleware_1.errorHandler); //error 미들웨어 맨 아래위치.
app.listen(PORT, () => {
    console.log(`${PORT} 포트로 서버가 열렸습니다!`);
});
