/*
* Функция получения случайного целого в диапазоне [min, max] или наоборот, если min > max
* Источник: Mozilla Developer Network (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
* */
function getRandomInt(min, max) {
  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }
  // округлим диапазон "внутрь", min до большего целого, max до меньшего
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(1, 10);

/*
 * Вспомогательные функции округления до precision знаков после запятой
 */
function floor10(number, precision = 0) {
  const multiplier = Math.pow(10, precision);
  return Math.floor(number * multiplier) / multiplier;
}
function round10(number, precision = 0) {
  const multiplier = Math.pow(10, precision);
  return Math.round(number * multiplier) / multiplier;
}
function ceil10(number, precision = 0) {
  const multiplier = Math.pow(10, precision);
  return Math.ceil(number * multiplier) / multiplier;
}

/*
* Функция получения случайного числа с точностью precision в диапазоне [min, max] или наоборот, если min > max
* */
function getRandomFloat(min, max, precision) {
  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }
  // округлим диапазон "внутрь" до требуемой точности
  min = ceil10(min, precision);
  max = floor10(max, precision);
  let randomNumber = Math.random() * (max - min + Math.pow(10, -precision - 1)) + min;
  randomNumber = round10(randomNumber, precision);
  return randomNumber;
}
getRandomFloat(0.1, 9.9, 1);
