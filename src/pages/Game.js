import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Question from '../Components/Question';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';

class Game extends Component {
  state = {
    questions: [],
    renderIndex: 0,
    // answered: false,
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

  nextQuestion = () => {
    this.setState((prevState) => ({
      renderIndex: prevState.renderIndex + 1,
    }));
  }

  render() {
    const { questions, renderIndex } = this.state;
    return (
      <main>
        <Header />
        <h1>Game page</h1>
        {
          questions.map((question, index) => (
            <section key={ question.question }>
              {
                renderIndex === index && (<Question question={ question } />)
              }
            </section>
          ))
        }
        <button type="button" onClick={ this.nextQuestion }>Próximo</button>
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
