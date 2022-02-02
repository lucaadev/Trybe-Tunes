import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      load: false,
    };
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  async checkFavorite() {
    this.setState({
      load: true,
    });
    const { trackId } = this.props;
    await addSong(trackId);
    this.setState({
      load: false,
      checked: true,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, load } = this.state;
    return (
      <>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ trackId }
            type="checkbox"
            checked={ checked }
            id="favorite"
            onChange={ this.checkFavorite }
          />
        </label>
        {load && <Loading />}
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.string.isRequired,
};
