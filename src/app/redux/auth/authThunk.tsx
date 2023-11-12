import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../configApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'inspector';

export const authLogin = createAsyncThunk('auth/login', async (authField, { rejectWithValue }) => {
  console.log(22222);

  try {
    const res = instance.post('/login', authField);
    console.log(res);
  } catch (e) {
    rejectWithValue('Ошибка логина пользователя');
  }
});

export const authRegister = createAsyncThunk(
  'auth/register',
  async (authField, { rejectWithValue }) => {
    try {
      const res = instance.post('/auth/sign-up', authField);
      console.log(res);
    } catch (e) {
      rejectWithValue('Ошибка регистрации');
    }
  }
);

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
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
    userRegister: builder.mutation({
      query: (body) => ({
        url: `/auth/sign-up`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
    }),
  }),
});

export const { useUserRegisterMutation, useUserLoginMutation } = auth;
