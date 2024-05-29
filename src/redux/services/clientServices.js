import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";

const clientServices = createApi({
  reducerPath: "clientServices",
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
    tagTypes: ["clientServices"],
  }),
  endpoints: (builder) => ({
    getClient: builder.query({
      query: () => `/api/client/getme`,
      providesTags: ["clientServices"],
    }),

    updateClient: builder.mutation({
      query: (body) => ({
        url: `/api/client/me`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["clientServices"],
    }),
    deleteClient: builder.mutation({
      query: (body) => ({
        url: `/api/client`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["clientServices"],
    }),
  }),
});

export const {
  useGetClientQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientServices;

export default clientServices;
