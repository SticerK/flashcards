import { letter } from 'pages/auth/forgotPassword/letter/letter';
import { IResponseLogin } from 'pages/auth/login/types/types';
import { LoginInputs } from 'pages/auth/login/ui/login';
import { IRequestResetPassword, IResponceMeGet } from './types';
import { rootApi } from '..';

interface IMe {
  avatar: string;
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  created: string;
  updated: string;
}

export const auth = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<IResponseLogin, LoginInputs>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
        xhrFields: {
          withCredentials: true,
        },
      }),
      transformResponse: (result: { data: IResponseLogin }) => {
        return result.data;
      },
      invalidatesTags: ['Auth'],
    }),
    userRegister: builder.mutation({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Auth'],
    }),
    userMe: builder.query<IMe, void>({
      query: () => ({
        url: '/auth/me',
      }),
      providesTags: ['Auth'],
      extraOptions: { maxRetries: 0 },
    }),
    forgotPassword: builder.mutation<string, string>({
      query: (email) => ({
        url: '/auth/recover-password',
        method: 'POST',
        body: {
          html: letter(),
          email,
          subject: 'string',
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        method: 'POST',
        url: '/auth/logout',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          auth.util.updateQueryData('userMe', undefined, () => {
            return null;
          })
        );
        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },

      invalidatesTags: ['Auth'],
    }),
    meUpdate: builder.mutation<IResponceMeGet, FormData>({
      query: (body) => ({
        method: 'PATCH',
        url: '/auth/me',
        body,
      }),
      invalidatesTags: ['Auth', 'Deck'],
    }),
    resetPassword: builder.mutation<null, IRequestResetPassword>({
      query: ({ token, password }) => ({
        method: 'POST',
        url: `/auth/reset-password/${token}`,
        body: { password },
      }),
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserMeQuery,
  useForgotPasswordMutation,
  useLogoutMutation,
  useMeUpdateMutation,
  useResetPasswordMutation,
} = auth;
