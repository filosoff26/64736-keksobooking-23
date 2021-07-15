import {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArraySubset} from './util.js';

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN_VARIANTS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES_VARIANTS = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

/*
 * Создание 10 случайных предложений об аренде
 */
function generateOffers () {
  const offers = [];

  for (let offerNumber = 1; offerNumber <= 10; offerNumber++) {
    const avatarFileNumber = (offerNumber < 10 ? '0' : '') + offerNumber;
    const location = {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    };
    const offerType = getRandomArrayElement(OFFER_TYPES);
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
        checkin: getRandomArrayElement(CHECKIN_VARIANTS),
        features: getRandomArraySubset(FEATURES_VARIANTS),
        description: `Nice ${offerType} with ${offerRooms} room(s)`,
        photos: getRandomArraySubset(PHOTOS),
      },
      location: location,
    });
  }
  return offers;
}

export {generateOffers};
