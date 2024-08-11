"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const petsitter_controller_1 = require("../controllers/petsitter.controller");
const review_validator_1 = require("../validators/review.validator");
const petsitterRouter = express_1.default.Router();
const petsitterController = new petsitter_controller_1.PetsitterController();
//펫시터 목록 조회 API
petsitterRouter.get("/", petsitterController.getPetsitters);
//펫시터 리뷰 작성 API
petsitterRouter.post("/:petSitterId/reviews", auth_middleware_1.default, review_validator_1.reviewValidator, petsitterController.createReview);
//펫시터 리뷰 조회 API
petsitterRouter.get("/:petSitterId/reviews", petsitterController.getPetsitterReviews);
exports.default = petsitterRouter;
