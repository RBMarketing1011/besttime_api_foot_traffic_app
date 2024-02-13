import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { besttime } from '../API Keys/apiKeys'

const baseQuery = fetchBaseQuery({
  baseUrl: besttime.url,
  // credentials: 'include'
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [ 'Amazon_Products' ],
  endpoints: (builder) => ({}),
})