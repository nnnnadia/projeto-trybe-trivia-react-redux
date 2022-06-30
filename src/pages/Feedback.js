import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <main>
        <h1>Feedback Page</h1>
        <Header />
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
