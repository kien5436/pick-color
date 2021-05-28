import { getCookie } from '../utils/cookies';

export async function getUserInfo() {

  const user = JSON.parse(getCookie('user'));

  if (!user.id) return {};

  const response = await fetch('/api/users/' + user.id);
  return await response.json();
}

/**
 * @param {number} userId
 * @param {{ win: boolean, time: number }} result
 */
export async function submitResult(result) {

  const crsf = document.querySelector('[name=csrfmiddlewaretoken]').value;

  await fetch('/api/scores', {
    body: JSON.stringify(result),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': crsf,
    },
    method: 'post',
  });
}

export async function login(username) {

  const crsf = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const res = await fetch('/api/users', {
    body: JSON.stringify({ name: username }),
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': crsf,
    },
    method: 'post',
  });
  return await res.json();
}

export async function getUserScores(userId) {

  const res = await fetch(`/api/users/${userId}/scores`);

  return await res.json();
}