import { baseQueryWithReauth } from '@/src/shared/model/inctagram.base-query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const inctagramService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'inctagramService',
  /// ADD Your Tags
  tagTypes: ['Profile', 'Me', 'Paymants', 'Post', 'Notifications'],
})
