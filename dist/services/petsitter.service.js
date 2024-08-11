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
exports.PetsitterService = void 0;
const petsitter_repository_1 = require("../repositories/petsitter.repository");
class PetsitterService {
    constructor() {
        this.petsitterRepository = new petsitter_repository_1.PetsitterRepository();
        this.findAllPetsitters = (name, region, experience) => __awaiter(this, void 0, void 0, function* () {
            const whereObject = {};
            if (name) {
                whereObject.name = { contains: name }; //contains 를 사용하면 부분일치 검색이 가능하다.
            }
            if (region) {
                whereObject.region = { contains: region };
            }
            if (experience) {
                whereObject.experience = { contains: experience };
            }
            const petSitters = yield this.petsitterRepository.findAllPetsitters(whereObject);
            const result = petSitters.map((sitter) => ({
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
        });
        //펫시터 리뷰
        this.createReview = (userId, petSitterId, rating, comment) => __awaiter(this, void 0, void 0, function* () {
            const petSitter = yield this.petsitterRepository.findPetsittersById(petSitterId);
            if (!petSitter) {
                throw new Error("펫시터를 찾을 수 없습니다");
            }
            const createdReview = yield this.petsitterRepository.createReview(userId, petSitterId, rating, comment);
            //reviewResponse형식 리턴
            const reviewResponse = {
                review_id: createdReview.id,
                pet_sitter_id: createdReview.pet_sitter_id,
                reviews: {
                    user_name: createdReview.users.name,
                    rating: createdReview.rating,
                    comment: createdReview.comment,
                    created_at: createdReview.created_at,
                    updated_at: createdReview.updated_at,
                },
            };
            return reviewResponse;
        });
        //펫시터 리뷰 조회
        this.getReviewByPetsitterId = (petSitterId) => __awaiter(this, void 0, void 0, function* () {
            const petsitter = yield this.petsitterRepository.getPetsitter(petSitterId);
            if (!petsitter) {
                throw new Error("펫시터를 찾을 수 없습니다.");
            }
            //리뷰찾기
            const reviews = yield this.petsitterRepository.getReviewByPetsitterId(petSitterId);
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
        });
    }
}
exports.PetsitterService = PetsitterService;
