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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsitterController = void 0;
const petsitter_service_1 = require("../services/petsitter.service");
// Review와 Users 관계를 포함하는 타입 정의
class PetsitterController {
    constructor() {
        this.petsitterService = new petsitter_service_1.PetsitterService(); // AuthService 클래스 타입
        //펫시터 목록
        this.getPetsitters = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, region, experience } = req.query;
            try {
                const petsitters = yield this.petsitterService.findAllPetsitters(name, region, experience);
                return res.status(200).json({
                    status: 200,
                    message: "펫시터 목록 조회 성공",
                    data: petsitters,
                });
            }
            catch (err) {
                next(err);
            }
        });
        //펫시터 리뷰
        this.createReview = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { petSitterId } = req.params;
            const { rating, comment } = req.body;
            if (!userId) {
                return res
                    .status(401)
                    .json({ status: 401, message: "사용자 ID가 없습니다." });
            }
            try {
                const Result = yield this.petsitterService.createReview(+userId, +petSitterId, rating, comment);
                return res.status(201).json({
                    status: 201,
                    message: "리뷰가 성공적으로 작성되었습니다.",
                    data: Result,
                });
            }
            catch (err) {
                next(err);
            }
        });
        //펫시터 리뷰 조회
        this.getPetsitterReviews = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { petSitterId } = req.params;
            try {
                //펫시터 리뷰 찾기
                const reviews = yield this.petsitterService.getReviewByPetsitterId(+petSitterId);
                return res
                    .status(200)
                    .json({ status: 200, message: "리뷰 조회", data: reviews });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.PetsitterController = PetsitterController;
