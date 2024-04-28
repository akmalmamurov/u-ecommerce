import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants";
import Cookies from "js-cookie";

const basketServices = createApi({
  reducerPath: "basket",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBasket: builder.query({
      query: () => {
        return `/api/basket`;
      },
    }),
    addBasket: builder.mutation({
      query: (body) => ({
        url: "/api/basket",
        method: "POST",
        body,
      }),
    }),
    updateBasket: builder.mutation({
      query: (body, id) => ({
        url: `/api/basket/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteBasket: builder.mutation({
      query: (id) => ({
        url: `/api/basket/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBasketQuery,
  useAddBasketMutation,
  useUpdateBasketMutation,
  useDeleteBasketMutation,
} = basketServices;

export default basketServices;
