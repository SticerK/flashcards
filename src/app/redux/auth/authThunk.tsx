import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../configApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IMe {
  avatar: string;
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  created: string;
  updated: string;
}

export const auth = createApi({
  reducerPath: 'AuthQuery',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.flashcards.andrii.es/v1/' }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    userMe: builder.query<IMe, null>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
    }),
    userRegister: builder.mutation({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useUserRegisterMutation, useUserLoginMutation, useUserMeQuery } = auth;
