import {createOfferCard} from './card.js';

const MAX_VISIBLE_POINTS = 10;

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const regularPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let map;
let mainPinMarker;
let pinsLayer;

const loadMap = (location, zoom, mapLoadHandler) => {
  map = L.map('map-canvas');
  map.on('load', mapLoadHandler);
  map.setView(location, zoom);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map);
  pinsLayer = L.layerGroup();
  pinsLayer.addTo(map);
};

const setMapState = (location, zoom, afterChangeHandler) => {
  map.on('moveend', afterChangeHandler).flyTo(location, zoom);
};

const addMainPin = (location, moveMainPinHandler) => {
  mainPinMarker = L.marker(
    location,
    {
      icon: mainPinIcon,
      draggable: true,
    },
  );

  mainPinMarker.addTo(map).on('moveend', moveMainPinHandler);
};

const setMainPinLocation = (location) => {
  mainPinMarker.setLatLng(location);
};

const clearPins = () => {
  pinsLayer.clearLayers();
};

const addPins = (data) => {
  for (let i = 0; i < data.length && i < MAX_VISIBLE_POINTS; i++) {
    const marker = L.marker(
      data[i].location,
      {
        regularPinIcon,
      },
    );
    marker.addTo(pinsLayer).bindPopup(() => createOfferCard(data[i]));
  }
};

export {loadMap, setMapState, addMainPin, setMainPinLocation, clearPins, addPins};
