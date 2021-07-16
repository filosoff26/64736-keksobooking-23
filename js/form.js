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

const mapFiltersForm =  document.querySelector('.map__filters');

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
  capacitySelect.value = capacitySelect.querySelector(':not([disabled])').value;
});

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

function activatePage() {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = false;
  });
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersForm.querySelectorAll('select, fieldset').forEach((element) => {
    element.disabled = false;
  });
}

export {deactivatePage, activatePage};
