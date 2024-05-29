import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants";
const brandServices = createApi({
  reducerPath: "brand",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
  }),
  tagTypes: ["brand"],
  endpoints: (builder) => ({
    getBrand: builder.query({
      query: () => `/api/brand`,
      providesTags: ["brand"],
    }),
    getBrandById: builder.query({
      query: (id) => `/api/brand/${id}`,
      providesTags: ["brand"],
    }),
  }),
});
export const { useGetBrandQuery, useGetBrandByIdQuery } = brandServices;
export default brandServices;
