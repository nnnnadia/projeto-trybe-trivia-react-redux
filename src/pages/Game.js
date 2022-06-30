import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Question from '../Components/Question';
// import Timer from '../Components/Timer';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';

class Game extends Component {
  state = {
    questions: [],
    renderIndex: 0,
    isAnswered: false,
  }

  async componentDidMount() {
    const { history } = this.props;
    const { results } = await fetchTriviaQuestions();
    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({
      questions: [...results],
    });
  }

  // Evento de próxima questão
  nextQuestion = () => {
    this.setState((prevState) => ({
      renderIndex: prevState.renderIndex + 1,
      isAnswered: false,
    }));
  }

  // Evento de resposta do usuário
  handleAnswer = () => {
    this.setState({ isAnswered: true });
  }

  render() {
    const {
      questions,
      renderIndex,
      isAnswered,
    } = this.state;
    return (
      <main>
        <Header />
        <h1>Game page</h1>
        {
          questions.map((question, index) => (
            <section key={ question.question }>
              {
                renderIndex === index && (
                  <Question
                    handleClick={ this.handleAnswer }
                    question={ question }
                    isAnswered={ isAnswered }
                  />
                )
              }
            </section>
          ))
        }
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.nextQuestion }
        >
          Próximo
        </button>
      </main>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
