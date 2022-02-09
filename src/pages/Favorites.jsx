import React, { Component } from 'react';
import Header from './components/Header';
import MusicCard from './components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './components/Loading';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      load: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.catchMusics();
  }

  catchMusics = async () => {
    this.setState({
      load: true,
    });
    const tracks = await getFavoriteSongs();
    this.setState({
      favorites: tracks,
      load: false,
    });
  }

  refreshFavSongs = async (trackId) => {
    const { favorites } = this.state;
    const musicsAtt = favorites.filter((music) => music.trackId !== trackId);
    this.setState({
      favorites: musicsAtt,
    });
  }

  render() {
    const { favorites, load } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <div>
            {
              favorites.map((music) => (
                <MusicCard
                  trackName={ music.trackName }
                  trackId={ music.trackId }
                  music={ music }
                  refreshFavSongs={ this.refreshFavSongs }
                  previewUrl={ music.previewUrl }
                  key={ music.trackId }
                />
              ))
            }
          </div>
          {load && <Loading />}
        </div>
      </>
    );
  }
}
