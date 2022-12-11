export const options = {
  baseUrl: 'https://api.kochetkov1.nomoredomains.club',
  body: {},
};

function handleServerResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка. Запрос не выполнен: ${res.status}`);
}

function register(email, password) {
  return fetch(`${options.baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(handleServerResponse);
}

function authorization(email, password) {
  return fetch(`${options.baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(handleServerResponse);
}

function getContent(jwt) {
  return fetch(`${options.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
  }).then(handleServerResponse);
}

export { register, authorization, getContent };
