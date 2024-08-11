import { getMyReview, rating } from "../models/reivew";
import { prisma } from "../utils/prisma.util";

export class ReviewRepository {
  getMyReviews = async (userId: number) => {
    return await prisma.reviews.findMany({
      where: { user_id: +userId },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        user_id: true,
        petsitters: {
          select: {
            name: true,
          },
        },
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true,
      },
    });
  };

  findReviewById = async (reviewId: number, userId: number) => {
    return await prisma.reviews.findUnique({
      where: { id: +reviewId, user_id: +userId },
    });
  };

  updateReview = async (
    reviewId: number,
    userId: number,
    updateData: rating
  ) => {
    return await prisma.reviews.update({
      where: { id: +reviewId, user_id: +userId },
      data: updateData,
      include: {
        petsitters: {
          select: { name: true },
        },
      },
    });
  };

  deleteReview = async (reviewId: number, userId: number): Promise<void> => {
    await prisma.reviews.delete({
      where: {
        id: +reviewId,
        user_id: +userId,
      },
    });
  };
}
