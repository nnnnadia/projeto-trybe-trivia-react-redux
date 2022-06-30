import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  componentDidMount() {
    const { updateTimer } = this.props;
    updateTimer();
  }

  componentDidUpdate(prevProps) {
    const { isAnswered, time, intervaId } = prevProps;

    if (isAnswered || time === 1) {
      clearInterval(intervaId);
    }
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        <p>{ time }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  intervaId: PropTypes.number.isRequired,
  updateTimer: PropTypes.func.isRequired,
};

export default Timer;
