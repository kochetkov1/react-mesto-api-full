// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.kochetkov1.nomoredomains.club';

function handleServerResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка. Запрос не выполнен: ${res.status}`);
}

function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(handleServerResponse);
}

function authorization(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(handleServerResponse);
}

function getContent(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
  }).then(handleServerResponse);
}

export { register, authorization, getContent };
