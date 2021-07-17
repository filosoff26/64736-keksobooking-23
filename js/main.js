import {generateAds} from './data.js';
import {initMap, addMainPin, addPin} from './map.js';

const MY_LOCATION = [35.675, 139.75]; // по ТЗ - [35.7, 139.6], @todo поменять потом
const INITIAL_ZOOM = 13;

initMap(MY_LOCATION, INITIAL_ZOOM);
addMainPin(MY_LOCATION);

const testAds = generateAds();
testAds.forEach((ad) => addPin(ad));
