import React, { Component } from 'react';
import Header from './components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    const idAlbum = window.location.pathname.split('/');
    this.catchMusics(idAlbum[idAlbum.length - 1]);
  }

  catchMusics = (idMusic) => {
    getMusics(idMusic)
      .then((song) => this.setState({ musics: song }));
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { console.log(musics) }
        {
          musics.map((music, index) => (
            index === 0 ? (
              <>
                <p data-testid="album-name">{music.collectionName}</p>
                <p data-testid="artist-name">{ music.artistName }</p>
              </>
            ) : (
              <MusicCard
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ `checkbox-music-${music.trackId}` }
                music={ music }
              />
            )
          ))
        }
      </div>
    );
  }
}
