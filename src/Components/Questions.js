import { React, Component } from 'react';
import PropTypes from 'prop-types';

// https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}
//
// curl https://opentdb.com/api.php?amount=5&token=${f95d2f13e4400e266d2daedd937db4f46cf9575483e9bd6510c53d7b01bd9d0c} 
// | grep "category"
// Recomendação
// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
//
export default class Questions extends Component {
  verifyCategory = (answer, questions, answered) => {
    if (!answered) {
      return '';
    }

    if (answered && questions.includes(answer)) {
      return 'wrong';
    }

    return 'correct';
  };

  render() {
    const { questions, answered, handleClick } = this.props;
    const answers = [...questions.correct_answer, ...questions.incorret_answer]
      .sort((a,b) => {
        return Math.random();
      });

    return (
      <div>
        <p data-testid="question-category">{ questions.category }</p>
        <p data-testid="question-text">{ questions.question }</p>
        <div data-testid="answers-options">
          { answers.map((answer, ind) => (
            <button
              type="button"
              key={ answer }
              data-testid={ questions.incorrect_answer.includes(answer)
                ? `wrong-answer-${ind} ` : 'correct_answer' }
              onClick={ handleClick }
            >
              { answer }
            </button>
          ))}
        </div>
      </div>

    );
  }
}

Questions.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorret_answer: PropTypes.arrayOf.isRequired,
  }).isRequired,
};
