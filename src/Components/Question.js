import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  state = {
    answersList: [],
    correctAnswerIndex: 0,
  }

  componentDidMount() {
    const {
      question: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;
    const shuffle = 0.5;

    const answersList = [...incorrectAnswers]
      .sort(() => shuffle - Math.random());

    const randomIndex = Math.round(Math.random() * incorrectAnswers.length);
    answersList.splice(randomIndex, 0, correctAnswer);

    this.setState({
      answersList,
      correctAnswerIndex: randomIndex,
    });
  }

  render() {
    const {
      question: {
        category,
        difficulty,
        question,
      },
    } = this.props;
    const { answersList, correctAnswerIndex } = this.state;
    return (
      <div>
        <h2 data-testid="question-text">{ question }</h2>
        <h4 data-testid="question-category">{ category }</h4>
        <h4>{ difficulty }</h4>
        <div data-testid="answer-options">
          {
            answersList.map((answer, index) => {
              if (index === correctAnswerIndex) {
                return (
                  <button
                    data-testid="correct-answer"
                    type="button"
                    key={ answer }
                  >
                    { answer }
                  </button>
                );
              }
              return (
                <button
                  data-testid={ `wrong-answer-${index}` }
                  type="button"
                  key={ answer }
                >
                  { answer }
                </button>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
};

export default Question;
