import { debounce } from 'underscore';

function openFilePicker(cloakStyle, options = {}) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style = cloakStyle;

  Object.keys(options).forEach((attribute) => {
    fileInput.setAttribute(attribute, options[attribute]);
  });

  document.body.appendChild(fileInput);
  fileInput.focus();
  fileInput.click();

  return new Promise((resolve, reject) => {
    function checkFiles() {
      if (this.files.length) {
        resolve(this.files);
      } else {
        reject(this.files);
      }

      if (this.parentNode === document.body) {
        document.body.removeChild(this);
      }
    }

    const eventListener = debounce(checkFiles, 200);

    fileInput.addEventListener('focus', eventListener, { once: true });
    fileInput.addEventListener('change', eventListener, { once: true });
  });
}

export default openFilePicker;
