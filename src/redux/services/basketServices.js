import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";

const basketServices = createApi({
  reducerPath: "basket",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
    tagTypes: ["Basket"],
  }),
  endpoints: (builder) => ({
    getBasket: builder.query({
      query: () => `/api/basket`,
      providesTags: ["Basket"],
    }),
    addBasket: builder.mutation({
      query: (body) => ({
        url: "/api/basket",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Basket"],
    }),
    updateBasket: builder.mutation({
      query: (body) => ({
        url: `/api/basket`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Basket"],
    }),
    deleteBasket: builder.mutation({
      query: (body) => ({
        url: `/api/basket`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Basket"],
    }),
    allDeleteBasket: builder.mutation({
      query: (body) => ({
        url: `/api/basket/all`,
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useGetBasketQuery,
  useAddBasketMutation,
  useUpdateBasketMutation,
  useDeleteBasketMutation,
  useAllDeleteBasketMutation,
} = basketServices;

export default basketServices;
