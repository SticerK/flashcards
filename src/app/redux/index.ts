import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  console.log(123);
  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es/v1/',
    credentials: 'include',
  });
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    // try to get a new token
    const refreshResult = await baseQuery('auth/refresh-token', api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      console.log(333);

      // retry the initial query
      result = await baseQuery('auth/login', api, extraOptions);
    } else {
      console.log(222);
    }
  }
  return result;
};

export const rootApi = createApi({
  reducerPath: 'AuthQuery',
  tagTypes: ['Auth', 'Deck', 'Cards'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
