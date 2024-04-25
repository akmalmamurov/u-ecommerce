import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants";
const categoryServices = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/api/category`,
    }),
    getCategoriesById: builder.query({
      query: (id) => `/api/category/${id}`,
    })
  }),
});
export const {useGetCategoriesQuery,useGetCategoriesByIdQuery} =  categoryServices;
export default categoryServices;
