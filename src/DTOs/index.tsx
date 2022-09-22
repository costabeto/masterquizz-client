export interface IUser {
  name: string;
  id: string;
}

export interface IRoundResultAnswer {
  user: string;
  answer: string;
}

export interface IRoundResult {
  round: number;
  question: string;
  correctAnswer: string;
  answers: IRoundResultAnswer[];
}

export interface IRound {
  question: string;
  options: { a: string; b: string; c: string; d: string; e: string };
}
