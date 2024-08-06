import { inctagramService } from '@/src/shared/services/inctagram.service'

export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    /// ADD your endpoints
    return {}
  },
})
