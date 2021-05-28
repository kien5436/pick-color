export function setCookie(cname, cvalue, exdays = 1) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/;samesite=lax';
}

/**
 * @param {string} name cookie name
 * @return {string|null} `null` if there is no cookie corresponding `name`
 */
export function getCookie(name) {

  name += '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i++) {

    let c = ca[i];

    while (' ' === c.charAt(0)) {
      c = c.substring(1);
    }

    if (0 === c.indexOf(name)) {
      return c.substring(name.length, c.length);
    }
  }

  return null;
}