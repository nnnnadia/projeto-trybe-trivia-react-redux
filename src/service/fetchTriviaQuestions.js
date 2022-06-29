const fetchTriviaQuestions = () => {
  const getTriviaQuestions = 'https://opentdb.com/api.php?amount=5&token=';
  const userToken = localStorage.getItem('token');

  return fetch(`${getTriviaQuestions}${userToken}`)
    .then((response) => response.json())
    .then((results) => results)
    .catch((err) => console.log(err));
};

export default fetchTriviaQuestions;
