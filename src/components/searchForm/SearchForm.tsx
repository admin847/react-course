import React, { Component } from 'react'
import './SearchForm.css'

interface IProps {
  searchString: string
  setSearchString: (searchString: string) => void
  formHandler: (e: React.FormEvent) => Promise<void>
}

class SearchForm extends Component<IProps> {
  render() {
    return (
      <form
        className="search-form"
        onSubmit={(e: React.FormEvent) => this.props.formHandler(e)}
      >
        <input
          type="search"
          className="search-form__input"
          placeholder="Search..."
          value={this.props.searchString}
          onChange={(e) => this.props.setSearchString(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchForm
