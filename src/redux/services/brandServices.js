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
      invalidatesTags: ["brand"],
    }),
    getBrandById: builder.query({
      query: (id) => `/api/brand/${id}`,
      invalidatesTags: ["brand"],
    }),
    getBrandBrand: builder.query({
      query: (id) => `/api/brand/${id}/brand`,
      invalidatesTags: ["brand"],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useGetCategoriesByIdQuery,
  useGetCategoriesBrandQuery,
} = brandServices;
export default brandServices;
