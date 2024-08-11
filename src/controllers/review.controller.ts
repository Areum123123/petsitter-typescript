import { Request, Response, NextFunction } from "express-serve-static-core";
import { ReviewService } from "../services/review.service";

export class ReviewController {
  private reviewService = new ReviewService();

  //본인리뷰
  myReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ status: 401, message: "사용자 ID가 없습니다." });
    }

    const myReviews = await this.reviewService.getMyReviews(+userId);

    return res.status(200).json({
      status: 200,
      message: "본인 리뷰조회 성공!",
      data: myReviews,
    });
  };

  //리뷰 수정
  updateReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { reviewId } = req.params;
    const userId = req.user?.id;
    const { rating, comment } = req.body;

    try {
      //리뷰찾기

      if (!userId) {
        return res
          .status(401)
          .json({ status: 401, message: "사용자 ID가 없습니다." });
      }

      const updatedReview = await this.reviewService.updateReview(
        +reviewId,
        userId,
        rating,
        comment
      );

      return res.status(200).json({
        status: 200,
        message: "펫시터 리뷰 수정 성공!",
        data: updatedReview,
      });
    } catch (err) {
      next(err);
    }
  };

  //리뷰삭제
  deleteReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { reviewId } = req.params;
    const userId = req.user?.id;
    try {
      if (!userId) {
        return res
          .status(401)
          .json({ status: 401, message: "사용자 ID가 없습니다." });
      }
      //삭제
      await this.reviewService.deleteReview(+reviewId, userId);

      return res
        .status(200)
        .json({ status: 200, message: "리뷰가 성공적으로 삭제되었습니다." });
    } catch (err) {
      next(err);
    }
  };
}
