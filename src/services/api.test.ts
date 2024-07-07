import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getDataFromApi } from './api'

// Создаем мок-сервер
const server = setupServer(
  http.get('https://swapi.dev/api/planets', () => {
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'Tatooine',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
          climate: 'arid',
          gravity: '1 standard',
          terrain: 'desert',
          surface_water: '1',
          population: '200000',
        },
      ],
    })
  }),
)

// Настраиваем сервер перед всеми тестами
beforeAll(() => server.listen())

// Останавливаем сервер после каждого теста
afterEach(() => server.resetHandlers())

// Закрываем сервер после завершения всех тестов
afterAll(() => server.close())

describe('getDataFromApi', () => {
  it('should return data for a valid search query', async () => {
    const data = await getDataFromApi('Tatooine')
    expect(data).toEqual({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: 'Tatooine',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
          climate: 'arid',
          gravity: '1 standard',
          terrain: 'desert',
          surface_water: '1',
          population: '200000',
        },
      ],
    })
  })

  it('should call the API with the correct query and page', async () => {
    const searchQuery = 'Tatooine'
    const page = 2

    server.use(
      http.get('https://swapi.dev/api/planets', ({ params }) => {
        expect(params.searchQuery).toBe(searchQuery)
        expect(params.page).toBe(page)
        return HttpResponse.json({
          count: 0,
          next: null,
          previous: null,
          results: [],
        })
      }),
    )

    await getDataFromApi(searchQuery, page)
  })
})
