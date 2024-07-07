import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import PlanetCard from './PlanetCard' // Измените путь в соответствии с расположением вашего модуля

describe('PlanetCard component', () => {
  it('should render with the correct planet name', () => {
    const planetName = 'Tatooine'
    render(<PlanetCard name={planetName} />)

    const listItemElement = screen.getByText(planetName)
    expect(listItemElement).toBeInTheDocument()
    expect(listItemElement).toHaveClass('planet-card')
  })
})
