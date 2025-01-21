import { debounce } from 'underscore';

function openFilePicker(cloakStyle, options = {}) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style = cloakStyle;

  Object.keys(options).forEach((attribute) => {
    fileInput.setAttribute(attribute, options[attribute]);
  });

  document.body.appendChild(fileInput);

  // Use setTimeout to ensure proper initialization before clicking
  setTimeout(() => fileInput.click(), 50);

  return new Promise((resolve, reject) => {
    function checkFiles(e) {
      if (!this.parentElement) {
        return;
      }
      
      // Give macOS more time to process the file selection
      setTimeout(() => {
        if (this.files.length) {
          resolve(this.files);
        } else {
          reject(this.files);
        }

        if (this.parentNode === document.body) {
          document.body.removeChild(this);
        }
      }, 500);
    }

    fileInput.addEventListener('change', checkFiles);
}

export default openFilePicker;
