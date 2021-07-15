import {makeOfferCards} from './card.js';
import {deactivatePage, activatePage} from './form.js';

makeOfferCards();
deactivatePage();

setTimeout(activatePage, 5000);
