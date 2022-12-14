export const readStorageRanking = () => JSON.parse(localStorage.getItem('ranking'));

export const saveScorePlayer = (ranking) => {
  const data = readStorageRanking();
  localStorage.setItem('ranking', JSON.stringify([...data, ranking]));
};
