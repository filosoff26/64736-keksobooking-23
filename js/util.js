/*
 * Функция взята из интернета и доработана
 * Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 */
function getRandomInt (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

/*
 * Функция взята из интернета и доработана
 * Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
 */
function getRandomFloat (min, max, digits = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

/*
 * Вспомогательные функции для получения одного или нескольких случайных элементов массива
 */
function getRandomArrayElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomArraySubset(array) {
  const start = getRandomInt(0, array.length - 1);
  const end = getRandomInt(start + 1, array.length);

  return array.slice(start, end);
}

export {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArraySubset};
