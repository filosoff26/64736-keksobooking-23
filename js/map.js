import {createOfferCard} from './card.js';

let map;
let mainPinMarker;

function loadMap(location, zoom, mapLoadHandler) {
  map = L.map('map-canvas');
  map.on('load', mapLoadHandler);
  map.setView(location, zoom);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map);
}

function setMapState(location, zoom, afterChangeHandler) {
  map.on('moveend', afterChangeHandler).flyTo(location, zoom);
}

function addMainPin(location, moveMainPinHandler) {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  mainPinMarker = L.marker(
    location,
    {
      icon: mainPinIcon,
      draggable: true,
    },
  );

  mainPinMarker.addTo(map).on('moveend', moveMainPinHandler);
}

function setMainPinLocation(location) {
  mainPinMarker.setLatLng(location);
}

function addPin(data) {
  const regularPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    data.location,
    {
      regularPinIcon,
    },
  );

  marker.addTo(map).bindPopup(() => createOfferCard(data));
}

export {loadMap, setMapState, addMainPin, setMainPinLocation, addPin};
