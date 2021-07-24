const KEYCODE_ESC = 27;

const showModal = (name) => {
  const modalFragment = document.querySelector(`#${name}`).content;
  const modal = modalFragment.querySelector(`.${name}`).cloneNode(true);

  let closeErrorPopup = () => {};

  const clickHandler = () => {
    closeErrorPopup();
  };

  const keydownHandler = (evt) => {
    if (evt.keyCode === KEYCODE_ESC) {
      closeErrorPopup();
    }
  };

  closeErrorPopup = () => {
    modal.remove();
    modal.removeEventListener('click', clickHandler);
    document.removeEventListener('keydown', keydownHandler);
  };

  modal.addEventListener('click', clickHandler);
  document.addEventListener('keydown', keydownHandler);
  document.body.appendChild(modal);
};

const showAlert = (parent, message, timeInSecs) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 9999;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.width = '80%';
  alertContainer.style.margin = '10px auto 0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ffd480';
  alertContainer.style.borderRadius = '5px';
  alertContainer.style.boxShadow = '0px 0px 5px';

  alertContainer.textContent = message;

  document.querySelector('#map-canvas').append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, timeInSecs * 1000);
};

export {showModal, showAlert};
