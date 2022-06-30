import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';

export default class Game extends Component {
  state = {
    questions: [],
    index: 0,
    correctIndex: 0,
    // answered: false,
  }

  async componentDidMount() {
    const six = 6;
    const { history } = this.props;
    const { results } = await fetchTriviaQuestions();
    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({
      questions: [...results],
      correctIndex: Math.floor(Math.random() * six),
    });
  }

  nextQuestion = () => {
    const six = 6;
    this.setState((prevState) => ({
      index: prevState.index + 1,
      correctIndex: Math.floor(Math.random() * six),
    }));
  }

  render() {
    const half = 0.5;
    const { questions, index, correctIndex } = this.state;
    return (
      <section>
        <Header />
        <h1>Game page</h1>
        <button type="button" onClick={ this.nextQuestion }>Próximo</button>
        { questions.map(({
          category,
          incorrect_answers: incorrects,
          correct_answer: correct,
          question,
          difficulty,
        }, index2) => {
          if (index === index2) {
            return (
              <div key={ question }>
                <h1 data-testid="question-text">{ question }</h1>
                <h2 data-testid="question-category">{ category }</h2>
                <h3>{ difficulty }</h3>
                <div data-testid="answer-options">
                  { incorrects.sort(() => Math.random() - half)
                    .map((incorrect, index3) => {
                      if (correctIndex === index3) {
                        return (
                          <div>
                            <button
                              type="button"
                              data-testid="correct-answer"
                            >
                              { correct }
                            </button>
                            <button
                              type="button"
                              key={ incorrect }
                              data-testid={ `wrong-answer-${index3}` }
                            >
                              { incorrect }
                            </button>
                          </div>
                        );
                      }
                      return (
                        <button
                          type="button"
                          key={ incorrect }
                          data-testid={ `wrong-answer-${index3}` }
                        >
                          { incorrect }
                        </button>
                      );
                    })}
                </div>
              </div>
            );
          } return null;
        })}
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
// Game.propTypes = {
//   fetch: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   fetch: () => dispatch(fetchToken()),
// });
