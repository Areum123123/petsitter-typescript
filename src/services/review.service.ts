import { myReview, ReviewResponse } from "../models/reivew";
import { ReviewRepository } from "../repositories/review.repository";

export class ReviewService {
  private reviewRepository = new ReviewRepository();

  getMyReviews = async (userId: number): Promise<myReview[]> => {
    const myReviews = await this.reviewRepository.getMyReviews(userId);

    return myReviews.map((review) => ({
      review_id: review.id,
      user_id: review.user_id,
      reviews: {
        petsitter_name: review.petsitters.name,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    }));
  };

  //리뷰수정
  updateReview = async (
    reviewId: number,
    userId: number,
    rating: number,
    comment: string
  ): Promise<myReview> => {
    //리뷰찾기
    const review = await this.reviewRepository.findReviewById(reviewId, userId);
    if (!review) {
      throw new Error("리뷰가 존재하지 않습니다.");
    }

    //찾은 리뷰 수정
    const updateData = {
      rating: rating,
      comment: comment,
    };

    const updateReview = await this.reviewRepository.updateReview(
      reviewId,
      userId,
      updateData
    );

    const result = {
      review_id: reviewId,
      user_id: userId,
      reviews: {
        petsitter_name: updateReview.petsitters.name,
        rating: updateReview.rating,
        comment: updateReview.comment,
        created_at: updateReview.created_at,
        updated_at: updateReview.updated_at,
      },
    };

    return result;
  };
  //리뷰삭제
  deleteReview = async (reviewId: number, userId: number): Promise<void> => {
    //리뷰존재여부
    const review = await this.reviewRepository.findReviewById(reviewId, userId);

    if (!review) {
      throw new Error("리뷰가 존재하지 않습니다.");
    }

    //삭제
    await this.reviewRepository.deleteReview(reviewId, userId);
  };
}
