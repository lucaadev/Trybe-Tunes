import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      load: true,
    };
  }

  componentDidMount() {
    getUser()
      .then((user) => this.setState({
        loginName: user.name, load: false,
      }));
  }

  render() {
    const { loginName, load } = this.state;
    return (
      <header data-testid="header-component">
        {
          load ? <Loading />
            : (
              <span data-testid="header-user-name">
                Olá!
                { loginName }
              </span>
            )
        }

        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}
