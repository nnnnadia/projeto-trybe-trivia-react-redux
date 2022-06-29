import React, { Component } from 'react';
import Header from '../Components/Header';

class Game extends Component {
  render() {
    return (
      <section>
        <Header />
        <h1>Game page</h1>
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
