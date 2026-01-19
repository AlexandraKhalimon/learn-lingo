export type Teacher = {
  id: string;
  name: string;
  surname: string;
  languages: Language[];
  levels: Level[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: Condition[];
  experience: string;
};

export type Language = string;

export type Level =
  | 'A1 Beginner'
  | 'A2 Elementary'
  | 'B1 Intermediate'
  | 'B2 Upper-Intermediate'
  | 'C1 Advanced'
  | 'C2 Proficient';

export type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

export type Condition = string;
