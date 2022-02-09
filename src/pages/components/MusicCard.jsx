import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      load: false,
    };
  }

  componentDidMount() {
    this.favCheckedMark();
  }

  favCheckedMark = async () => {
    const favoriteSongsData = await getFavoriteSongs();
    const { trackId } = this.props;

    if (favoriteSongsData.some((song) => song.trackId === trackId)) {
      this.setState({
        checked: true,
      });
    }
  }

  checkFavorite = async () => {
    const { trackId, refreshFavSongs } = this.props;
    const { checked } = this.state;

    if (checked === false) {
      this.setState({
        load: true,
      });

      await addSong(trackId);

      this.setState({
        load: false,
        checked: true,
      });
    } else if (checked === true) {
      this.setState({
        load: true,
      });

      await removeSong(trackId);
      await refreshFavSongs(trackId);

      this.setState({
        load: false,
        checked: false,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, load } = this.state;
    return (
      <main>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label htmlFor="checkbox">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ checked }
            id="checkbox"
            onChange={ this.checkFavorite }
          />
        </label>
        {load && <Loading />}
      </main>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  refreshFavSongs: propTypes.func.isRequired,
};
