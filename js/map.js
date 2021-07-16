import {activatePage, deactivatePage, setFormLatLng} from './form.js';
import {createOfferCard} from './card.js';

let map;

function initMap(location, zoom) {
  deactivatePage();

  map = L.map('map-canvas')
    .on('load', activatePage)
    .setView(location, zoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map);
}

function addMainPin(location) {
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  const mainPinMarker = L.marker(
    location,
    {
      icon: mainPinIcon,
      draggable: true,
    },
  );

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', () => {
    setFormLatLng(mainPinMarker.getLatLng());
  });

  setFormLatLng(location);
}

function addPin(ad) {
  const regularPinIcon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    ad.location,
    {
      regularPinIcon,
    },
  );

  marker.addTo(map).bindPopup(() => createOfferCard(ad));
}

export {initMap, addMainPin, addPin};
