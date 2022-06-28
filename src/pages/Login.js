import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import fetchToken from '../redux/actions';
import { initGame } from '../service/localStoragePlayer';

class Login extends Component {
  state = {
    nome: '',
    email: '',
    isButtonDisabled: true,
  }

  verifyInputs = () => {
    const { nome, email } = this.state;
    if (nome.length < 1 || email.length < 1) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  };

  handleChange = (event) => {
    const { target: { value, name } } = event;
    this.setState({ [name]: value }, this.verifyInputs);
  };

  fetchToken = async () => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  }

  handleClick = async () => {
    const { history } = this.props;
    const token = await this.fetchToken();
    initGame(token);
    history.push('/game');
  }

  render() {
    const {
      handleChange,
      handleClick,
      state: {
        nome,
        email,
        isButtonDisabled,
      },
    } = this;
    return (
      <form>
        <label htmlFor="nome-input">
          Nome:
          <input
            type="text"
            id="nome-input"
            data-testid="input-player-name"
            name="nome"
            value={ nome }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email-input">
          Email:
          <input
            type="text"
            id="email-input"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ handleClick }
          disabled={ isButtonDisabled }
        >
          Play
        </button>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </form>);
  }
}

Login.propTypes = {
  // fetch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// const mapDispatchToProps = (dispatch) => ({
//   fetch: () => dispatch(fetchToken()),
// });

export default Login;
