import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';
import Questions from '../Components/Questions';

export default class Game extends Component {
  state = {
    questions: [],
    index: 0,
    answered: false,
  }

  async componentDidMount() {
    const { history } = this.props;
    const { results } = await fetchTriviaQuestions();
    console.log(results);
    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState((prevState) => ({
      ...prevState,
      questions: [...results],
    }));
  }

  render() {
    const { questions, answered, index } = this.state;
    return (
      <section>
        <Header />
        <h1>Game page</h1>
        { !questions.length && (
          <Questions
            questions={ questions[index] }
            answered={ answered }
            handleClick={ this.handleClick }
          />)}
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
