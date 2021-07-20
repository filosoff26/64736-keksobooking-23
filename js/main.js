import {loadMap, setMapState, addMainPin, setMainPinLocation, clearPins, addPins} from './map.js';
import {deactivateForm, activateForm, resetForm, setFormLatLng, addFormSubmitHandlers, addformResetHandler} from './form.js';
import {deactivateFilters, activateFilters, resetFilters} from './filter.js';
import {getData} from './api.js';
import {showAlert, showModal} from './dialog.js';

const INITIAL_LOCATION = [35.675, 139.75];
const INITIAL_ZOOM = 13;

function moveMainPinHandler(evt) {
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

function filterHandler(data) {
  clearPins();
  addPins(data);
}

deactivateForm();
deactivateFilters();

loadMap(INITIAL_LOCATION, INITIAL_ZOOM, () => {
  addMainPin(INITIAL_LOCATION, moveMainPinHandler);
  setFormLatLng(INITIAL_LOCATION);
  activateForm();

  addFormSubmitHandlers(formSubmitHandler, formErrorHandler);
  addformResetHandler(formResetHandler);

  getData((realAds) => {
    filterHandler(realAds);
    activateFilters(realAds, filterHandler);
  }, () => showAlert(
    document.querySelector('#map-canvas'),
    'Не удалось получить данные с сервера. Попробуйте позже',
    3));
});
