import { IFilters } from 'widgets/pack/ui/packCard';
import { rootApi } from '..';
import { ICardsResponse } from './types';

const cardsApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    allCards: builder.query<ICardsResponse, { id: string; params: IFilters }>({
      query: ({ id, params }) => ({
        url: `decks/${id}/cards`,
        params,
      }),
      providesTags: ['Cards'],
    }),
  }),
});

export const { useAllCardsQuery } = cardsApi;
