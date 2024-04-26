import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants";

const loginServices = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
  }),
  endpoints: (builder) => ({
    getLogin: builder.query({
      query: () => {
        return `/api/auth/login`;
      },
    }),
    addLogin: builder.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
    }),
    updateCategory: builder.mutation({
      query: (body, id) => ({
        url: `/api/auth/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/auth/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetLoginQuery,
  useAddLoginMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = loginServices;

export default loginServices;
