import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { PetsitterController } from "../controllers/petsitter.controller";
import { reviewValidator } from "../validators/review.validator";

const petsitterRouter = express.Router();
const petsitterController = new PetsitterController();

//펫시터 목록 조회 API
petsitterRouter.get("/", petsitterController.getPetsitters);

//펫시터 리뷰 작성 API
petsitterRouter.post(
  "/:petSitterId/reviews",
  authMiddleware,
  reviewValidator,
  petsitterController.createReview
);

//펫시터 리뷰 조회 API
petsitterRouter.get(
  "/:petSitterId/reviews",
  petsitterController.getPetsitterReviews
);

export default petsitterRouter;
