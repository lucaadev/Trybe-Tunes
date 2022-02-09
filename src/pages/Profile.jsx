import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './components/Header';
import Loading from './components/Loading';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      infoProfile: {},
      load: true,
    };
  }

  componentDidMount() {
    this.getInfoLogin();
  }

  getInfoLogin = async () => {
    const getInfo = await getUser();
    this.setState({
      infoProfile: getInfo,
      load: false,
    });
  }

  render() {
    const { infoProfile, load } = this.state;
    if (load) {
      return (
        <>
          <Header />
          <Loading />
        </>
      );
    }
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <img data-testid="profile-image" src={ infoProfile.image } alt="profile" />
          <p>{infoProfile.name}</p>
          <p>{infoProfile.name}</p>
          <p>{infoProfile.email}</p>
          <p>{infoProfile.description}</p>
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </div>
      </>
    );
  }
}
