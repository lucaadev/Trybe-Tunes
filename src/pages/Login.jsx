import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './components/Loading';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      load: false,
      redirect: false,
      conditionForButton: true,
    };
  }

  loginChange = ({ target }) => {
    const { value } = target;
    this.setState({
      loginName: value,
    }, () => {
      this.setState({ conditionForButton: this.buttonChange() });
    });
  }

  buttonChange = () => {
    const minLetters = 3;
    const { loginName } = this.state;
    if (loginName.length < minLetters) return true;
    return false;
  }

  button = () => {
    const { loginName } = this.state;
    this.setState({ load: true });
    createUser({ name: loginName })
      .then(() => this.setState({ redirect: true, load: false }));
  }

  render() {
    const {
      loginName,
      conditionForButton,
      redirect,
      load,
    } = this.state;
    return (
      <div data-testid="page-login">
        <form onSubmit={ this.button }>
          <label htmlFor="login-name-input">
            <input
              name="Login"
              data-testid="login-name-input"
              type="text"
              onChange={ this.loginChange }
              value={ loginName }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ conditionForButton }
            onClick={ this.button }
          >
            Entrar
          </button>
        </form>
        {load && <Loading />}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}
