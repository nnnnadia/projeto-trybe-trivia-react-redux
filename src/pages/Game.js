import React, { Component } from 'react';
import Header from '../Components/Header';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';
import Questions from '../Components/Questions';
'
class Game extends Component {
  state = {
    questions:[],
    index: 0,
    answered: false,
  }

  componentDidMount = async () => {
    const { history } = this.props;
    const { results } = await fetchTriviaQuestions();

    if(results.length === 0) {
      localStorage.removeItem('token');
    }
  };

  render() {
    return (
      <section>
        <Header />
        <h1>Game page</h1>
        <Questions />
      </section>
    );
  }
}

// Game.propTypes = {
//   fetch: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   fetch: () => dispatch(fetchToken()),
// });

export default Game;
