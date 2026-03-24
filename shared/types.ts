export interface Exercise {
  _id?: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  comment?: string;
}

export interface Session {
  _id?: string;
  userId?: string;
  split: string;
  date: string;
  exercises: Exercise[];
}

export interface User {
  _id?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    email: string;
  };
  token: string;
}
