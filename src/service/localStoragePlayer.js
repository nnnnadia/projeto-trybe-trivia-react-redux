if (!localStorage.getItem('token')) {
  localStorage.setItem('token', '');
}

export const readStorageData = () => localStorage.getItem('token');

export const initGame = (token) => localStorage.setItem('token', token);
