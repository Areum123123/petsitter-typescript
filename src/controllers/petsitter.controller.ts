import { Request, Response, NextFunction } from "express";
import { PetsitterService } from "../services/petsitter.service";

// Review와 Users 관계를 포함하는 타입 정의

export class PetsitterController {
  private petsitterService = new PetsitterService(); // AuthService 클래스 타입

  //펫시터 목록
  getPetsitters = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { name, region, experience } = req.query;
    try {
      const petsitters = await this.petsitterService.findAllPetsitters(
        name as string | undefined,
        region as string | undefined,
        experience as string | undefined
      );

      return res.status(200).json({
        status: 200,
        message: "펫시터 목록 조회 성공",
        data: petsitters,
      });
    } catch (err) {
      next(err);
    }
  };

  //펫시터 리뷰
  createReview = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const userId = req.user?.id;
    const { petSitterId } = req.params;
    const { rating, comment } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ status: 401, message: "사용자 ID가 없습니다." });
    }

    try {
      const Result = await this.petsitterService.createReview(
        +userId,
        +petSitterId,
        rating,
        comment
      );

      return res.status(201).json({
        status: 201,
        message: "리뷰가 성공적으로 작성되었습니다.",
        data: Result,
      });
    } catch (err) {
      next(err);
    }
  };

  //펫시터 리뷰 조회
  getPetsitterReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { petSitterId } = req.params;
    try {
      //펫시터 리뷰 찾기
      const reviews = await this.petsitterService.getReviewByPetsitterId(
        +petSitterId
      );

      return res
        .status(200)
        .json({ status: 200, message: "리뷰 조회", data: reviews });
    } catch (err) {
      next(err);
    }
  };
}
