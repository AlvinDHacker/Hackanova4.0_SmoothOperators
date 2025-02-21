// types/map.ts
export interface Location {
    id: string;
    position: [number, number];
    title: string;
    description: string;
    address: string;
    rating: number;
    openingHours: string;
    features: string[];
    reviews: Review[];
  }
  
  export interface Review {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }