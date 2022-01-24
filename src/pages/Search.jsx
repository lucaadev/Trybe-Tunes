import React, { Component } from 'react';
import Header from './components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchBox: '',
      conditionButton: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchBox: value,
    },
    this.setState({
      conditionButton: this.changeButton(),
    }));
  }

  changeButton = () => {
    const { searchBox } = this.state;
    const min = 1;
    if (searchBox.length < min) return true;
    return false;
  }

  render() {
    const { searchBox, conditionButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            name="searchBox"
            value={ searchBox }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ conditionButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
