
export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  lessons: { title: string; duration: string; isCompleted: boolean }[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  isFeatured: boolean;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}
