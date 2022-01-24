import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchBox: '',
      conditionButton: true,
      founds: [],
      load: false,
      results: false,
      message: '',
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

  submitButton = () => {
    const { searchBox } = this.state;
    this.setState({
      load: true,
      searchBox: '',
    });
    searchAlbumsAPI(searchBox)
      .then((promise) => this.setState({
        conditionButton: true,
        founds: promise,
        results: true,
        load: false,
        message: `${searchBox}`,
      }));
  }

  render() {
    const { searchBox, conditionButton, load, founds, results, message } = this.state;
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
          {
            load ? <Loading />
              : (
                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ conditionButton }
                  onClick={ this.submitButton }
                >
                  Pesquisar
                </button>
              )
          }

          {
            results && (
              founds.length > 0 ? (
                <div>
                  <p>{`Resultado de álbuns de: ${message}`}</p>
                  <div>
                    {
                      founds.map((album) => (
                        <Link
                          data-testid={ `link-to-album-${album.collectionId}` }
                          key={ album.collectionId }
                          to={ `/album/${album.collectionId}` }
                        >
                          <img
                            alt={ album.collectionName }
                            src={ album.artworkUrl100 }
                          />
                          <h4>{ album.collectionName }</h4>
                        </Link>
                      ))
                    }
                  </div>
                </div>
              ) : 'Nenhum álbum foi encontrado'
            )
          }
        </form>
      </div>
    );
  }
}
