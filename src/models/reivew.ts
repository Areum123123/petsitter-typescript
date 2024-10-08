export interface Review {
  id: number;
  pet_sitter_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  users: {
    name: string;
  };
}

export interface ReviewResponse {
  review_id: number;
  pet_sitter_id: number;
  reviews: {
    user_name: string;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface myReview {
  review_id: number;
  user_id: number;
  reviews: {
    petsitter_name: string;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface rating {
  rating: number;
  comment: string;
}

export interface getMyReview {
  id: number;
  user_id: number;
  petsitters?: PetsitterInfo;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
}
// 펫시터 정보를 정의하는 인터페이스
export interface PetsitterInfo {
  name: string;
}
