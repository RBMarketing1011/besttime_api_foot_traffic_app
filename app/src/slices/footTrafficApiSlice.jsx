import { apiSlice } from './apiSlice'
import { besttime } from '../API Keys/apiKeys'

export const footTrafficApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKeyInfo: builder.query({
      query: () => `/keys/${ besttime.Api_key_private }`,
    }),
    getFootTrafficData: builder.mutation({
      query: (data) => ({
        url: `/forecasts?api_key_private=${ besttime.Api_key_private }&venue_name=${ data.venueName }&venue_address=${ data.venueAddress }`,
        method: 'POST'
      }),
    })
  }),
})

export const {
  useGetFootTrafficDataMutation,
  useGetKeyInfoQuery
} = footTrafficApiSlice