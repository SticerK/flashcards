import { rootApi } from '..';
import { store } from '../store';
import { IDeck, IDecksRequest, IDecksResponse, IDeskCard } from './types';

const descApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createDecks: builder.mutation<IDecksResponse, IDecksRequest>({
      query: (body) => ({
        method: 'POST',
        body,
        url: '/decks',
      }),
      invalidatesTags: ['Deck'],
    }),
    editDeck: builder.mutation({
      query: ({ id, ...body }) => ({
        method: 'PATCH',
        url: `/decks/${id}`,
        body,
      }),
    }),
    deck: builder.query<IDecksResponse, IDeck>({
      query: (params) => ({
        url: '/decks',
        params,
      }),
      providesTags: ['Deck'],
    }),
    deskItem: builder.query<IDeskCard, string>({
      query: (id) => `/decks/${id}`,
    }),
    deleteDeskItem: builder.mutation<IDeskCard, string>({
      query: (id) => ({
        url: `/decks/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { queryFulfilled, dispatch }) {
        const filters = store.getState().descSlice.filters;
        try {
          await queryFulfilled;
          dispatch(
            descApi.util.updateQueryData('deck', filters, (draft) => {
              return { ...draft, items: draft.items.filter((item) => item.id !== id) };
            })
          );
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const {
  useCreateDecksMutation,
  useLazyDeckQuery,
  useDeckQuery,
  useDeskItemQuery,
  useEditDeckMutation,
  useDeleteDeskItemMutation,
} = descApi;
