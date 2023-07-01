import { checkResponse } from './checkResponse';

// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = 'http://localhost:3001';

function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
}

/** authentication of user - отправка рег данных - регистрация пользователя */
export const register = (email, password) => {
  // console.log(password, email)
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// проверка на существование пользователя (логинизация)
export const authorize = (email, password) => {
  // console.log(password, email)
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    //   credentials: 'include', // теперь куки посылаются вместе с запросом
    body: JSON.stringify({ email, password }),
  })
      // .then(checkResponse);
      .then(checkResponse)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        return data;
      })
};

/** отправляем запрос на роут аутентификации */
export const checkToken = () => {
  // console.log(token)
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include', // теперь куки посылаются вместе с запросом
  })
      .then(checkResponse);
};
