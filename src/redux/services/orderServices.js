import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

const orderServices = createApi({
  reducerPath: "order",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
    prepareHeaders: (headers) => {
      const token = Cookies.get(TOKEN);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
    tagTypes: ["order"],
  }),
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: () => `/api/order`,
      providesTags: ["order"],
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: "/api/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useGetOrderQuery, useAddOrderMutation } = orderServices;

export default orderServices;
