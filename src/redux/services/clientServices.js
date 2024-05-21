import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDPOINT, TOKEN } from "../../constants";

const clientServices = createApi({
  reducerPath: "client",
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
    tagTypes: ["client"],
  }),
  endpoints: (builder) => ({
    getClient: builder.query({
      query: () => `/api/client/getme`,
      providesTags: ["client"],
    }),

    updateClient: builder.mutation({
      query: (body) => ({
        url: `/api/client`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["client"],
    }),
    deleteClient: builder.mutation({
      query: (body) => ({
        url: `/api/client`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useGetClientQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientServices;

export default clientServices;
