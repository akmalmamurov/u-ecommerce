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
  }),
});

export const {useGetAllProductsQuery} = productAllServices;
export default productAllServices;
