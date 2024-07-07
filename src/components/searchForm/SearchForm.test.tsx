import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import SearchForm from './SearchForm'

describe('SearchForm component', () => {
  test('should render input and button elements', () => {
    render(
      <SearchForm
        searchString=""
        setSearchString={() => {}}
        formHandler={() => Promise.resolve()}
      />,
    )

    const inputElement = screen.getByPlaceholderText('Search...')
    const buttonElement = screen.getByRole('button', { name: /search/i })

    expect(inputElement).toBeTruthy()
    expect(buttonElement).toBeTruthy()
  })

  test('should call setSearchString on input change', async () => {
    const setSearchString = vi.fn()
    render(
      <SearchForm
        searchString=""
        setSearchString={setSearchString}
        formHandler={() => Promise.resolve()}
      />,
    )

    const TEXT = 'test search!!!'
    const inputElement = screen.getByPlaceholderText('Search...')
    await userEvent.type(inputElement, TEXT)

    expect(setSearchString).toHaveBeenCalledTimes(TEXT.length)
    expect(setSearchString).toHaveBeenCalledWith(TEXT[0])
  })

  test('should call formHandler on form submit', () => {
    const formHandler = vi.fn().mockResolvedValue(undefined)
    render(
      <SearchForm
        searchString=""
        setSearchString={() => {}}
        formHandler={formHandler}
      />,
    )

    const formElement = screen.getByRole('form')
    fireEvent.submit(formElement)

    expect(formHandler).toHaveBeenCalledTimes(1)
  })

  test('should display the correct value in the input', () => {
    const searchString = 'initial search'
    render(
      <SearchForm
        searchString={searchString}
        setSearchString={() => {}}
        formHandler={() => Promise.resolve()}
      />,
    )

    const inputElement = screen.getByPlaceholderText('Search...')
    expect(inputElement).toHaveValue(searchString)
  })
})
