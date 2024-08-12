import { PetsitterRepository } from "../repositories/petsitter.repository";
import { Petsitters } from "@prisma/client";
import { ReviewResponse } from "../models/reivew";
import { prisma } from "../utils/prisma.util";

export class PetsitterService {
  private petsitterRepository = new PetsitterRepository();

  findAllPetsitters = async (
    name?: string,
    region?: string,
    experience?: string
  ): Promise<Petsitters[]> => {
    const whereObject: Record<string, any> = {};

    if (name) {
      whereObject.name = { contains: name }; //contains 를 사용하면 부분일치 검색이 가능하다.
    }

    if (region) {
      whereObject.region = { contains: region };
    }

    if (experience) {
      whereObject.experience = { contains: experience };
    }

    const petSitters = await this.petsitterRepository.findAllPetsitters(
      whereObject
    );

    const result: Petsitters[] = petSitters.map((sitter) => ({
      id: sitter.id,
      name: sitter.name,
      experience: sitter.experience,
      certification: sitter.certification,
      region: sitter.region,
      total_rate: sitter.total_rate,
      image_url: sitter.image_url,
      created_at: sitter.created_at,
      updated_at: sitter.updated_at,
    }));
    return result;
  };

  //펫시터 리뷰
  createReview = async (
    userId: number,
    petSitterId: number,
    rating: number,
    comment: string
  ): Promise<ReviewResponse> => {
    const petSitter = await this.petsitterRepository.findPetsittersById(
      petSitterId
    );

    if (!petSitter) {
      throw new Error("펫시터를 찾을 수 없습니다");
    }

    //트랜잭션[리뷰작성,리뷰평점평균,펫시터에평점update]
    const transactionResult = await prisma.$transaction(async (tx) => {
      const createdReview = await this.petsitterRepository.createReview(
        userId,
        petSitterId,
        rating,
        comment,
        tx
      );

      //펫시터 리뷰
      const petsitterReviews =
        await this.petsitterRepository.findReviewsByPetSitterId(
          petSitterId,
          tx
        );

      const averageRating = (
        petsitterReviews.reduce(
          (sum: number, review: { rating: number }) => sum + review.rating,
          0
        ) / petsitterReviews.length
      ).toFixed(1);

      //리뷰 평점
      await this.petsitterRepository.updateTotalRate(
        petSitterId,
        +averageRating,
        tx
      );

      return createdReview;
    });

    //reviewResponse형식 리턴
    const reviewResponse: ReviewResponse = {
      review_id: transactionResult.id,
      pet_sitter_id: transactionResult.pet_sitter_id,
      reviews: {
        user_name: transactionResult.users.name,
        rating: transactionResult.rating,
        comment: transactionResult.comment,
        created_at: transactionResult.created_at,
        updated_at: transactionResult.updated_at,
      },
    };
    return reviewResponse;
  };

  //펫시터 리뷰 조회
  getReviewByPetsitterId = async (
    petSitterId: number
  ): Promise<ReviewResponse[]> => {
    const petsitter = await this.petsitterRepository.getPetsitter(petSitterId);
    if (!petsitter) {
      throw new Error("펫시터를 찾을 수 없습니다.");
    }

    //리뷰찾기
    const reviews = await this.petsitterRepository.getReviewByPetsitterId(
      petSitterId
    );

    const result = reviews.map((review) => ({
      review_id: review.id,
      pet_sitter_id: review.pet_sitter_id,
      reviews: {
        user_name: review.users.name,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
        updated_at: review.updated_at,
      },
    }));

    return result;
  };
}
