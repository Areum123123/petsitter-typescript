import { Review, ReviewResponse } from "../models/reivew.js";
import { PetSitter } from "../models/petsitter.js";
import { prisma } from "../utils/prisma.util.js";

export class PetsitterRepository {
  findAllPetsitters = async (whereObjec: Record<string, any>) => {
    return await prisma.petsitters.findMany({
      where: whereObjec,
      orderBy: { created_at: "desc" },
    });
  };

  findPetsittersById = async (petSitterId: number) => {
    return await prisma.petsitters.findUnique({
      where: { id: petSitterId },
    });
  };

  createReview = async (
    userId: number,
    petSitterId: number,
    rating: number,
    comment: string
  ): Promise<Review> => {
    return await prisma.reviews.create({
      data: {
        user_id: userId,
        pet_sitter_id: petSitterId,
        rating,
        comment,
      },
      include: {
        users: {
          select: { name: true },
        },
      },
    });
  };

  //펫시터 리뷰
  getPetsitter = async (petSitterId: number) => {
    return await prisma.petsitters.findUnique({
      where: {
        id: +petSitterId,
      },
    });
  };

  getReviewByPetsitterId = async (petSitterId: number) => {
    return await prisma.reviews.findMany({
      where: { pet_sitter_id: +petSitterId },
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        pet_sitter_id: true,
        users: {
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
}
