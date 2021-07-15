import {generateAds} from './data.js';

const OFFER_TYPE_TRANSLATIONS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card').content;

function addElementContent(parent, selector, content) {
  const element = parent.querySelector(selector);

  if (content === '') {
    element.classList.add('hidden');
    return;
  }
  if (element.tagName === 'IMG') {
    element.src = content;
  } else {
    element.textContent = content;
  }
}

function addFeatures(featuresBlock, features) {
  featuresBlock.querySelectorAll('.popup__feature').forEach((element) => {
    element.classList.add('hidden');
  });
  features.forEach((feature) => {
    featuresBlock.querySelector(`.popup__feature--${feature}`).classList.remove('hidden');
  });
}

function addOfferPhotos(photosBlock, photos) {
  if (photos === undefined || photos.length === 0) {
    photosBlock.classList.add('hidden');
    return;
  }

  const photoTemplate = photosBlock.querySelector('.popup__photo');
  photosBlock.removeChild(photoTemplate);
  photos.forEach((photoSrc) => {
    const newPhoto = photoTemplate.cloneNode(false);
    newPhoto.src = photoSrc;
    photosBlock.appendChild(newPhoto);
  });
}

function createOfferCard(ad) {
  const card = cardTemplate.cloneNode(true);

  addElementContent(card, '.popup__title', ad.offer.title);
  addElementContent(card, '.popup__title', ad.offer.title);
  addElementContent(card, '.popup__text--address', ad.offer.address);
  addElementContent(card, '.popup__text--price', `${ad.offer.price} ₽/ночь`);
  addElementContent(card, '.popup__type', OFFER_TYPE_TRANSLATIONS[ad.offer.type]);
  addElementContent(card, '.popup__text--capacity', `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`);
  addElementContent(card, '.popup__text--time', `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`);
  addElementContent(card, '.popup__description', ad.offer.description);
  addElementContent(card, '.popup__avatar', ad.author.avatar);
  addFeatures(card.querySelector('.popup__features'), ad.offer.features);
  addOfferPhotos(card.querySelector('.popup__photos'), ad.offer.photos);

  return card;
}

function makeOfferCards() {
  const ads = generateAds();
  document.querySelector('#map-canvas').appendChild(createOfferCard(ads[0]));
}

export {makeOfferCards};
