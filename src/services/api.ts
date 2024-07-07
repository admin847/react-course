import { TPlanetResponse } from '../types/api.type.ts'

const getDataFromApi = async (
  searchQuery: string,
  page: number = 1,
): Promise<TPlanetResponse> => {
  return await fetch(
    `https://swapi.dev/api/planets?search=${searchQuery}&page=${page}`,
  ).then((res) => res.json())
}

export { getDataFromApi }
