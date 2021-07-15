const adForm = document.querySelector('.ad-form');
const mapFiltersForm =  document.querySelector('.map__filters');

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
