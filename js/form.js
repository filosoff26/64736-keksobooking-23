import {sendData} from './api.js';

const MINIMAL_PRICES_BY_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const CAPACITY_BY_ROOM_NUMBER = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const adForm = document.querySelector('.ad-form');
const typeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const addressInput = adForm.querySelector('#address');

const mapFiltersForm =  document.querySelector('.map__filters');

function roomNumberChangeHandler() {
  for (const option of capacitySelect.options) {
    const allowedCapacities = CAPACITY_BY_ROOM_NUMBER[roomNumberSelect.value];
    option.disabled = !allowedCapacities.includes(option.value);
  }
  const firstEnabledOption = capacitySelect.querySelector(':not([disabled])');
  capacitySelect.value = firstEnabledOption.value;
}

function deactivatePage() {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = true;
  });
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersForm.querySelectorAll('select, fieldset').forEach((element) => {
    element.disabled = true;
  });
}

function activateForm() {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = false;
  });
  roomNumberChangeHandler();
}

function activateFilters() {
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersForm.querySelectorAll('select, fieldset').forEach((element) => {
    element.disabled = false;
  });
}

function resetForm() {
  adForm.reset();
}

function resetFilters() {
  mapFiltersForm.reset();
}

function setFormLatLng(data) {
  const {lat, lng} = L.latLng(data);
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

function addFormSubmitHandlers(successHandler, errorHandler) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      evt.target.action,
      new FormData(evt.target),
      successHandler,
      errorHandler);
  });
}

function addformResetHandler(formResetHandler) {
  adForm.addEventListener('reset', formResetHandler);
}

typeSelect.addEventListener('change', () => {
  priceInput.min = MINIMAL_PRICES_BY_TYPE[typeSelect.value];
  priceInput.placeholder = priceInput.min;
});
timeInSelect.addEventListener('change', () => {
  timeOutSelect.value = timeInSelect.value;
});
timeOutSelect.addEventListener('change', () => {
  timeInSelect.value = timeOutSelect.value;
});
roomNumberSelect.addEventListener('change', roomNumberChangeHandler);
adForm.addEventListener('reset', roomNumberChangeHandler);

export {deactivatePage, activateForm, activateFilters, resetForm, resetFilters, setFormLatLng, addFormSubmitHandlers, addformResetHandler};
