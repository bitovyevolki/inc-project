import { inctagramService } from '@/src/shared/model/inctagram.service'
import { IOption } from '@bitovyevolki/ui-kit-int'

import { IGetCitiesResponse, IGetCountriesResponse } from '../model/types/geo'

export const GeoService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getCities: builder.query<IOption[], { countryCode: string }>({
        query: ({ countryCode }) => {
          return {
            headers: {
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
              'X-RapidAPI-Key': '67abfaa741msh5a161587c6b2d75p18398fjsn1320652597e1',
            },
            method: 'GET',
            url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/places?limit=10&minPopulation=500000&types=CITY`,
          }
        },
        transformResponse: (res: IGetCitiesResponse) => {
          return res.data.map(el => ({ label: el.name, value: el.name }))
        },
      }),
      getCountries: builder.query<IOption[], void>({
        query: () => {
          return {
            headers: {
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
              'X-RapidAPI-Key': '67abfaa741msh5a161587c6b2d75p18398fjsn1320652597e1',
            },
            method: 'GET',
            url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=10&currencyCode=EUR`,
          }
        },
        transformResponse: (res: IGetCountriesResponse) => {
          return res.data.map(el => ({ label: el.name, value: el.name }))
        },
      }),
    }
  },
})

export const { useGetCitiesQuery } = GeoService
