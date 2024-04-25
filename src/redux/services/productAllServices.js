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
      query: (search) =>
        `/api/product?q=${encodeURIComponent(search.trim().toLowerCase())}`,
    }),
    getProductById: builder.query({
      query: (id) => `/api/product/${id}`,
    }),
    getProductsByCid: builder.query({
      query: (cid) => `/api/product?cid=${cid}`,
    })
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSearchProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCidQuery,
} = productAllServices;

export default productAllServices;
