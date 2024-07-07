import { Component } from 'react'
import './PlanetCard.css'

interface IProps {
  name: string
}

class PlanetCard extends Component<IProps> {
  render() {
    return <li className="planet-card">{this.props.name}</li>
  }
}

export default PlanetCard
