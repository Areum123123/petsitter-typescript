export interface PetSitter {
  petSitterId: number;
  name: string;
  experience: string;
  certification: string;
  region: string;
  total_rate?: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

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
