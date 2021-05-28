/**
 * @param {string|string[]|object} classList
 * @returns {string}
 */
export default function stylize(classList) {

  const classType = typeof classList;

  if ('number' === classType || 'string' === classType) {
    return sanitizeString(classList);
  }

  if (Array.isArray(classList)) {
    return normalizeArray(classList);
  }

  if (classType && 'object' === classType) {

    if (!classList.hasOwnProperty('base')) {
      throw new Error("Object must contain 'base' property");
    }

    const { base, ...styles } = classList;
    const baseType = typeof base;
    let classNames = [];

    if ('number' === baseType || 'string' === baseType) {
      classNames.push(base);
    }
    else if (Array.isArray(base)) {
      classNames = base;
    }
    else {
      throw new TypeError('Object\'s property must be a number, string or an array of number/string');
    }

    for (const className in styles) {
      if (styles.hasOwnProperty(className) && styles[className]) {
        classNames.push(className);
      }
    }

    return normalizeArray(classNames);
  }

  throw new TypeError('Expect parameter is a number, string or an array of number/string');
}

function sanitizeString(str) {

  if ('number' !== typeof str && 'string' !== typeof str) {
    throw new TypeError('Expect a number or string');
  }

  return str.toString().replace(/\s{2,}/, ' ')
    .trim();
}

function normalizeArray(arr) {

  if (Array.isArray(arr) && 0 < arr.length) {

    const classNames = [];

    for (let i = arr.length; 0 <= --i;) {
      classNames.push(sanitizeString(arr[i]));
    }

    return classNames.join(' ');
  }
  else {
    throw new TypeError('Expect an array of number/string');
  }
}