export interface IDecksRequest {
  name: string;
  isPrivate: boolean;
}

export interface IDecksResponse {
  items: IDeskCard[];
  maxCardCount: string;
  pagination: IPagination;
}

export interface IPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface IDeskCard {
  author: {
    id: string;
    name: string;
  };
  id: string;
  userId: string;
  name: string;
  isPrivate: true;
  shots: number;
  cover: string;
  created: string;
  updated: string;
  cardsCount: number;
}

export interface IDeck {
  minCardsCount: number;
  maxCardsCount: number;
  name?: string;
  authorId?: string;
  orderBy?: string;
  currentPage: number;
  itemsPerPage?: number;
}

export interface IDeckSlice {
  filters: IDeck;
}
