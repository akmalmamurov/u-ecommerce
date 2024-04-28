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
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    updateLogin: builder.mutation({
      query: (body, id) => ({
        url: `/api/auth/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteLogin: builder.mutation({
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
  useUpdateLoginMutation,
  useDeleteLoginMutation,
} = loginServices;

export default loginServices;
