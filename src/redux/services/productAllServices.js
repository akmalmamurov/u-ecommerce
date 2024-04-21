import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants";

const productAllServices = createApi({
  reducerPath: "productAll",
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINT,
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `/api/product`,
    }),
    getSearchProducts: builder.query({
      query: (search) => `/api/product?q=${search}`,
    }),
    getProductById: builder.query({
      query: (id) => `/api/product/${id}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSearchProductsQuery,
  useGetProductByIdQuery,
} = productAllServices;

export default productAllServices;
