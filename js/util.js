/*
 * Определение класса встроенных объектов или примитивов. Полезно при проверке входных данных
 */
const getClass = (obj) => ({}).toString.call(obj).slice(8, -1);

/*
 * Функция взята из интернета и доработана
 * Источник - https://www.freecodecamp.org/news/javascript-debounce-example
 */
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getClass, debounce};
