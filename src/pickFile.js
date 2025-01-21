import { debounce } from 'underscore';

function openFilePicker(cloakStyle, options = {}) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style = cloakStyle;

  Object.keys(options).forEach((attribute) => {
    fileInput.setAttribute(attribute, options[attribute]);
  });

  document.body.appendChild(fileInput);
  fileInput.click();

  return new Promise((resolve, reject) => {
    function cleanup() {
      // Always cleanup input if it's still in the document
      if (fileInput.parentNode === document.body) {
        document.body.removeChild(fileInput);
      }
    }

    fileInput.addEventListener('change', function(e) {
      if (this.files.length) {
        resolve(this.files);
      } else {
        reject(new Error('No files selected'));
      }
      cleanup();
    });

    // Handle the case where the file picker is canceled
    window.addEventListener('focus', function onBlur() {
      // Use a small timeout to ensure the change event fires first if a file was selected
      setTimeout(() => {
        if (fileInput.parentNode === document.body && !fileInput.files.length) {
          reject(new Error('No files selected'));
          cleanup();
        }
        window.removeEventListener('focus', onBlur);
      }, 300);
    }, { once: true });
  });
}

export default openFilePicker;
