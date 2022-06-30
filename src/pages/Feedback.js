import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
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
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.playerReducer.assertions,
});

export default connect(mapStateToProps)(Feedback);
