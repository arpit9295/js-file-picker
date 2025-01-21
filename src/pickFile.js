import { debounce } from 'underscore';

function openFilePicker(cloakStyle, options = {}) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style = cloakStyle;

  Object.keys(options).forEach((attribute) => {
    fileInput.setAttribute(attribute, options[attribute]);
  });

  return new Promise((resolve, reject) => {
    function checkFiles() {
      if (!this.parentElement) {
        return;
      }
      if (this.files.length) {
        resolve(this.files);
      } else {
        reject(this.files);
      }

      if (this.parentNode === document.body) {
        document.body.removeChild(this);
      }
    }

    const eventListener = function (e) {
      window.setTimeout(checkFiles.bind(this, e), 200);
    };

    fileInput.addEventListener('focus', eventListener);
    fileInput.addEventListener('change', checkFiles);

    document.body.appendChild(fileInput);
    setTimeout(() => fileInput.click(), 0);
  });
}

export default openFilePicker;
