const ALLOWED_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

function enableImagePreview(input, img) {
  const hiddenImage = img.classList.contains('hidden');
  const defaultSrc = img.src;

  input.addEventListener('change', () => {
    const file = input.files[0];
    const fileName = file.name.toLowerCase();
    const matches = ALLOWED_FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        img.src = reader.result;
        if (hiddenImage) {
          img.classList.remove('hidden');
        }
      });
      reader.readAsDataURL(file);
    }
  });

  input.form.addEventListener('reset', () => {
    img.src = defaultSrc;
    if (hiddenImage) {
      img.classList.add('hidden');
    }
  });
}

export {enableImagePreview};
