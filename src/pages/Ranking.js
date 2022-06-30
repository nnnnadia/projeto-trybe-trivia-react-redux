import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
// import { readStorageRanking } from '../service/localStorageRanking';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = data.sort((a, b) => (b.score - a.score));
    this.setState({ ranking: sortedRanking });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map((score, index) => (
          <div key={ index }>
            <img
              src={ score.picture }
              alt="imagem usuario"
            />
            <h3 data-testid={ `player-name-${index}` }>{ score.name }</h3>
            <h3 data-testid={ `player-score-${index}` }>{ score.score }</h3>
          </div>
        ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar para o início
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
