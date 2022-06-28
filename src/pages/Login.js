import React, { Component } from 'react';

export default class Login extends Component {
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
      </form>);
  }
}
