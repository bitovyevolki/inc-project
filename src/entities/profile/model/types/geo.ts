export interface ICountry {
  code: string
  currencyCodes: string[]
  name: string
  wikiDataId: string
}

export interface IGetCountriesResponse {
  data: ICountry[]
}

export interface ICity {
  id: number
  latitude: number
  longitude: number
  name: string
  population: number
  region: string
  regionCode: string
  regionWdId: string
  type: string
  wikiDataId: string
}

export interface IGetCitiesResponse {
  data: ICity[]
}
