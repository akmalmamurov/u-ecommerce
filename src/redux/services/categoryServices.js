import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants";
const categoryServices = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
  }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/api/category`,
      invalidatesTags: ["category"],
    }),
    getCategoriesById: builder.query({
      query: (id) => `/api/category/${id}`,
      invalidatesTags: ["category"],
    }),
    getCategoriesBrand: builder.query({
      query: (id) => `/api/category/${id}/brand`,
      invalidatesTags: ["category"],
    })
  }),
});
export const {useGetCategoriesQuery,useGetCategoriesByIdQuery,useGetCategoriesBrandQuery} =  categoryServices;
export default categoryServices;
