import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Question from '../Components/Question';
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
                    nextQuestion={ this.nextQuestion }
                  />
                )
              }
            </section>
          ))
        }
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
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
