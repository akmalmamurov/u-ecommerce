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
  }),
});
export const {useGetCategoriesQuery} =  categoryServices;
export default categoryServices;
