import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Question from '../Components/Question';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';
import { actUpdateScore } from '../redux/actions';

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
    const {
      props: { history },
      state: { renderIndex },
    } = this;
    const LAST_INDEX = 4;
    this.setState((prevState) => ({
      renderIndex: prevState.renderIndex + 1,
      isAnswered: false,
    }));
    if (renderIndex === LAST_INDEX) history.push('/feedback');
  }

  // Evento de resposta do usuário
  handleAnswer = (questionScore) => {
    const { updateScore } = this.props;
    this.setState({ isAnswered: true });
    updateScore(questionScore);
  }

  render() {
    const {
      state: {
        questions,
        renderIndex,
        isAnswered,
      },
      handleAnswer,
      nextQuestion,
    } = this;
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
                    handleClick={ handleAnswer }
                    question={ question }
                    isAnswered={ isAnswered }
                    nextQuestion={ nextQuestion }
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

const mapDispatchToProps = (dispatch) => ({
  updateScore: (questionScore) => dispatch(actUpdateScore(questionScore)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
