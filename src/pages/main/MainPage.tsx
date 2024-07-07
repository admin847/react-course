import React, { Component } from 'react'
import './MainPage.css'
import { getDataFromApi } from '../../services/api.ts'
import { IPlanet } from '../../types/api.type.ts'
import PlanetCard from '../../components/planetCard/PlanetCard.tsx'
import SearchForm from '../../components/searchForm/SearchForm.tsx'

interface IState {
  searchQuery: string
  planets: IPlanet[]
  loading: boolean
  searchPlanets: () => Promise<void>
  searchFromHandler: (e: React.FormEvent) => Promise<void>
}

class MainPage extends Component {
  state: IState = {
    searchQuery: localStorage.getItem('searchQuery') || '',
    planets: [],
    loading: false,
    searchPlanets: async () => {
      try {
        this.setState({ loading: true })
        const res = await getDataFromApi(this.state.searchQuery)
        this.setState({
          planets: res.results,
        })
      } catch (e) {
        this.state.planets = []
      } finally {
        this.setState({ loading: false })
      }
    },
    searchFromHandler: async (e: React.FormEvent) => {
      e.preventDefault()
      localStorage.setItem('searchQuery', this.state.searchQuery)
      await this.state.searchPlanets()
    },
  }

  async componentDidMount() {
    await this.state.searchPlanets()
  }

  render() {
    return (
      <div className="main-page">
        <header className="main-page__header">
          <SearchForm
            searchString={this.state.searchQuery}
            setSearchString={(value: string) =>
              this.setState({ searchQuery: value })
            }
            formHandler={this.state.searchFromHandler}
          />
        </header>
        <main className="main-page__body">
          {this.state.loading && <div>Loading...</div>}
          <ul className="planet-list">
            {this.state.planets.length && !this.state.loading ? (
              this.state.planets.map((planet) => (
                <PlanetCard key={planet.url} name={planet.name} />
              ))
            ) : (
              <div>No results found</div>
            )}
          </ul>
        </main>
      </div>
    )
  }
}

export default MainPage
