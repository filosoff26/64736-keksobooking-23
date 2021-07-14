/*
 * Функция получения случайного целого в диапазоне [min, max] или наоборот, если min > max
 * Источник: Mozilla Developer Network (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
 */
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
 */
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


/*
 * Вспомогательные функции для получения одного или нескольких случайных элементов массива
 */
function getRandomArrayElement (array) {
  return array[getRandomInt(0, array.length - 1)];
}

function getRandomArraySubset (array) {
  const start = getRandomInt(0, array.length - 1);
  const end = getRandomInt(start + 1, array.length);
  return array.slice(start, end);
}

/*
 * Создание 10 случайных предложений об аренде
 */
function generateOffers () {
  const offerTypes = [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel',
  ];
  const checkinVariants = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const featuresVariants = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  const photosVariants = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ];
  const offers = [];

  for (let offerNumber = 1; offerNumber <= 10; offerNumber++) {
    const avatarFileNumber = (offerNumber < 10 ? '0' : '') + offerNumber;
    const location = {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    };
    const offerType = getRandomArrayElement(offerTypes);
    const offerRooms = getRandomInt(1, 5);
    offers.push({
      author: {
        avatar: `img/avatars/user${avatarFileNumber}.png`,
      },
      offer: {
        title: `Offer #${offerNumber}`,
        address: `${location.lat}, ${location.lng}`,
        price: getRandomInt(1000, 9999),
        type: offerType,
        rooms: offerRooms,
        guests: getRandomInt(1, 9),
        checkin: getRandomArrayElement(checkinVariants),
        features: getRandomArraySubset(featuresVariants),
        description: `Nice ${offerType} with ${offerRooms} room(s)`,
        photos: getRandomArraySubset(photosVariants),
      },
      location: location,
    });
  }
  return offers;
}

generateOffers();
