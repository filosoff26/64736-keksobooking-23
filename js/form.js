import {sendData} from './api.js';
import {enableImagePreview} from './image-preview.js';

const COORDINATES_PRECISION = 5;

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
const avatarInput = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const offerImageInput = adForm.querySelector('#images');

const offerImagePreview = document.createElement('img');
offerImagePreview.src = '';
offerImagePreview.classList.add('hidden');
offerImagePreview.style.width = '100%';
offerImagePreview.style.height = '100%';
adForm.querySelector('.ad-form__photo').appendChild(offerImagePreview);

enableImagePreview(avatarInput, avatarPreview);
enableImagePreview(offerImageInput, offerImagePreview);

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = true;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = false;
  });
};

const resetForm = () => {
  adForm.reset();
  typeSelect.dispatchEvent(new Event('change'));
  roomNumberSelect.dispatchEvent(new Event('change'));
};

const setFormLatLng = (data) => {
  const {lat, lng} = L.latLng(data);
  addressInput.value = `${lat.toFixed(COORDINATES_PRECISION)}, ${lng.toFixed(COORDINATES_PRECISION)}`;
};

const addFormSubmitHandlers = (successHandler, errorHandler) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      evt.target.action,
      new FormData(evt.target),
      successHandler,
      errorHandler);
  });
};

const addFormResetHandler = (formResetHandler) => {
  adForm.addEventListener('reset', formResetHandler);
};

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
roomNumberSelect.addEventListener('change', () => {
  for (const option of capacitySelect.options) {
    const allowedCapacities = CAPACITY_BY_ROOM_NUMBER[roomNumberSelect.value];
    option.disabled = !allowedCapacities.includes(option.value);
  }
  const firstEnabledOption = capacitySelect.querySelector(':not([disabled])');
  capacitySelect.value = firstEnabledOption.value;
});

export {deactivateForm, activateForm, resetForm, setFormLatLng, addFormSubmitHandlers, addFormResetHandler};
