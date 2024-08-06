import { baseQueryWithReauth } from '@/src/shared/services/inctagram.fetch-base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const inctagramService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'inctagramService',
  /// ADD your tags
  tagTypes: [],
})
