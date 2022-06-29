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

  // const shuffleArray = (arrayNumbers) => {

  // }

  render() {
    const { questions } = this.props;
    // const rand = 0.5;
    const answers = [...questions.correct_answer, ...questions.incorrect_answers];
    // .sort((a, b) => rand - Math.floor());
    return (
      <div>
        <div data-testid="question-category">{ questions.category }</div>
        <div data-testid="question-text">{ questions.question }</div>
        <div data-testid="answers-options">
          { answers.map((answer, ind) => (
            <button
              type="button"
              key={ answer }
              data-testid={ questions.incorrect_answers.includes(answer)
                ? `wrong-answer-${ind} ` : 'correct_answer' }
              // onClick={ handleClick }
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
  questions: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  // handleClick: PropTypes.func.isRequired,
};
