import ErrorBoundary from './errorBoundary.tsx'
import { screen, render } from '@testing-library/react'
import { vi, it, expect, describe } from 'vitest'

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>,
    )

    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()
  })

  it('renders an error message when an error occurs', () => {
    const Throw = () => {
      throw new Error('Error')
    }

    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>,
    )
    expect(screen.getByText('Something went wrong.')).toBeTruthy()
  })

  it('calls logErrorToMyService when an error occurs', () => {
    const logErrorToMyService = vi.spyOn(console, 'error')

    const Throw = () => {
      throw new Error('Error')
    }

    render(
      <ErrorBoundary>
        <Throw />
      </ErrorBoundary>,
    )

    expect(logErrorToMyService).toHaveBeenCalled()
  })
})
