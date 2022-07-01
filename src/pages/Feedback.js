import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends React.Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <main>
        <h1>Feedback Page</h1>
        <Header />
        {
          (assertions < MIN_ASSERTIONS)
            ? (
              <h2 data-testid="feedback-text">Could be better...</h2>
            )
            : (
              <h2 data-testid="feedback-text">Well Done!</h2>
            )
        }
        <section>
          <span>Pontuação:</span>
          <span data-testid="feedback-total-score">{ score }</span>
          <span>Acertos:</span>
          <span data-testid="feedback-total-question">{ assertions }</span>
        </section>
        <section>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.goToRanking }
          >
            VER RANKING
          </button>
        </section>
        <section>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            JOGAR NOVAMENTE
          </button>
        </section>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
