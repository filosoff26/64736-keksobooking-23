import {
  loadMap,
  setMapState,
  addMainPin,
  setMainPinLocation,
  addPin
} from './map.js';

import {
  deactivatePage,
  activateForm,
  activateFilters,
  resetForm,
  resetFilters,
  setFormLatLng,
  addFormSubmitHandlers,
  addformResetHandler
} from './form.js';

import {
  getData
} from './api.js';

import {
  showAlert,
  showModal
} from './dialog.js';

const INITIAL_LOCATION = [35.675, 139.75];
const INITIAL_ZOOM = 13;
const MAX_VISIBLE_POINTS = 10;

function moveMainPinHandler (evt) {
  setFormLatLng(evt.target.getLatLng());
}

function formResetHandler() {
  setMapState(INITIAL_LOCATION, INITIAL_ZOOM, () => {
    setMainPinLocation(INITIAL_LOCATION);
    setFormLatLng(INITIAL_LOCATION);
  });
}

function formSubmitHandler() {
  showModal('success');
  resetForm();
  resetFilters();
}

function formErrorHandler() {
  showModal('error');
}

deactivatePage();
loadMap(INITIAL_LOCATION, INITIAL_ZOOM, () => {
  addMainPin(INITIAL_LOCATION, moveMainPinHandler);
  setFormLatLng(INITIAL_LOCATION);
  activateForm();

  addFormSubmitHandlers(formSubmitHandler, formErrorHandler);
  addformResetHandler(formResetHandler);

  getData((realAds) => {
    realAds.slice(0, MAX_VISIBLE_POINTS).forEach((ad) => addPin(ad));
    activateFilters();
  }, () => showAlert(
    document.querySelector('#map-canvas'),
    'Не удалось получить данные с сервера. Попробуйте позже',
    3));
});
