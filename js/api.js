const CARD_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';

function getData(successHandler, errorHandler) {
  fetch(CARD_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => successHandler(data))
    .catch(() => errorHandler());
}

function sendData(url, data, successHandler, errorHandler) {
  fetch(
    url,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        successHandler();
      } else {
        throw new Error();
      }
    })
    .catch(() => errorHandler());
}

export {getData, sendData};
