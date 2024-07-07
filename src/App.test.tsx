import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Мокаем компоненты MainPage и ErrorBoundary
vi.mock('./pages/main/MainPage', () => ({
  default: () => <div>MainPage Component</div>,
}))

vi.mock('./components/errorBoundary/errorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>ErrorBoundary Component{children}</div>
  ),
}))

describe('App component', () => {
  it('should render MainPage within ErrorBoundary', () => {
    render(<App />)

    const errorBoundaryElement = screen.getByText('ErrorBoundary Component')
    const mainPageElement = screen.getByText('MainPage Component')

    expect(errorBoundaryElement).toBeInTheDocument()
    expect(mainPageElement).toBeInTheDocument()
  })
})
