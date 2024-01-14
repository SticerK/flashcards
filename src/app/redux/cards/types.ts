import { IPagination } from '../desc/types';

export interface ICardsResponse {
  items: ICard[];
  pagination: IPagination;
}

export interface ICard {
  answer: string;
  answerImg: string;
  answerVideo: string;
  created: string;
  deckId: string;
  grade: number;
  id: string;
  question: string;
  questionImg: string;
  questionVideo: string;
  shorts: number;
  updated: string;
  userId: string;
}
