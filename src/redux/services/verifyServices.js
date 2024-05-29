import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";

const verifyServices = createApi({
  reducerPath: "verify",
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
    tagTypes: ["verify"],
  }),
  endpoints: (builder) => ({
    addVerify: builder.mutation({
      query: (body) => ({
        url: "/api/auth/verify_code",
        method: "POST",
        body,
      }),
      invalidatesTags: ["verify"],
    }),
  }),
});

export const { useAddVerifyMutation } = verifyServices;

export default verifyServices;
