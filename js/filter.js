import {debounce} from './util.js';

const mapFiltersForm =  document.querySelector('.map__filters');
const filtersCollection = mapFiltersForm.querySelectorAll('.map__filter, .map__checkbox');
const typeSelect = mapFiltersForm.querySelector('#housing-type');
const priceSelect = mapFiltersForm.querySelector('#housing-price');
const roomSelect = mapFiltersForm.querySelector('#housing-rooms');
const guestSelect = mapFiltersForm.querySelector('#housing-guests');
const filterFeatures = mapFiltersForm.querySelectorAll('[name=features]');

let rawOfferData;
let filterHandler;

const deactivateFilters = () => {
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersForm.querySelectorAll('select, fieldset').forEach((element) => {
    element.disabled = true;
  });
};

const activateFilters = (data, callback) => {
  rawOfferData = data;
  filterHandler = callback;
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersForm.querySelectorAll('select, fieldset').forEach((element) => {
    element.disabled = false;
  });
};

const resetFilters = () => {
  mapFiltersForm.reset();
};

const filterPrice = (value) => {
  switch (priceSelect.value) {
    case 'low':
      return value < 10000;
    case 'middle':
      return value >= 10000 && value <= 50000;
    case 'high':
      return value > 50000;
    default:
      return true;
  }
};

const filterSelect = (select, value) =>
  select.value === 'any' || Number(select.value) === Number(value);

const getFeatureWeight = (features) => {
  const selectedFeatures = [];
  for (const elem of filterFeatures) {
    if (elem.checked) {
      selectedFeatures.push(elem.value);
    }
  }
  features = features || [];
  return features.reduce((weight, elem) => {
    if (selectedFeatures.includes(elem)) {
      weight++;
    }
    return weight;
  }, 0);
};

const changeFiltersHandler = () => {
  const types = typeSelect.value === 'any' ?
    Array.from(typeSelect.options).map((opt) => opt.value).slice(1) :
    typeSelect.value;

  const filteredData = rawOfferData.filter((ad, index, array) => {
    const typeMatch = types.includes(ad.offer.type);
    const roomsMatch = filterSelect(roomSelect, ad.offer.rooms);
    const guestsMatch = filterSelect(guestSelect, ad.offer.guests);
    const priceMatch = filterPrice(ad.offer.price);
    array[index].weight = getFeatureWeight(ad.offer.features);

    return typeMatch && roomsMatch && guestsMatch && priceMatch;
  });
  filterHandler(filteredData.sort((a, b) => b.weight - a.weight));
};

for (const filter of filtersCollection) {
  filter.addEventListener('change', debounce(changeFiltersHandler));
}

export {deactivateFilters, activateFilters, resetFilters, changeFiltersHandler};
