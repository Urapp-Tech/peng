import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utils/constant';
import { BASE_URL } from '@/utils/constants/Endpoints';

export const ratingAPI = createApi({
  reducerPath: 'rating-api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllRatingReviews: builder.query({
      query: ({
        itemId,
        page,
        size,
      }: {
        itemId: any;
        page: any;
        size: any;
      }) => ({
        url: `api/v1/app/rating/reviews/${itemId}`,
        params: { page, size },
      }),
    }),
    getRatingStarList: builder.query({
      query: (homeCatId: string) =>
        `api/v1/app/rating/distinct/star/list/${homeCatId}`,
    }),
  }),
});

export const {
  useLazyGetAllRatingReviewsQuery,
  useLazyGetRatingStarListQuery,
} = ratingAPI;
