import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants";

const loginServices = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
    tagTypes: ["login"],
  }),
  endpoints: (builder) => ({
    getLogin: builder.query({
      query: () => {
        return `/api/auth/login`;
      },
      providesTags: ["login"],
    }),
    addLogin: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["login"],
    }),
    updateLogin: builder.mutation({
      query: (body, id) => ({
        url: `/api/auth/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["login"],
    }),
    deleteLogin: builder.mutation({
      query: (id) => ({
        url: `/api/auth/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

export const {
  useGetLoginQuery,
  useAddLoginMutation,
  useUpdateLoginMutation,
  useDeleteLoginMutation,
} = loginServices;

export default loginServices;
