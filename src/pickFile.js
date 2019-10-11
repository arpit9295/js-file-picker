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
      fileInput.removeEventListener('focus', checkFiles);
      fileInput.removeEventListener('change', checkFiles);

      if (fileInput.files.length) {
        resolve(fileInput.files);
      } else {
        reject(fileInput.files);
      }

      if (fileInput.parentNode === document.body) {
        document.body.removeChild(fileInput);
      }
    }
    fileInput.addEventListener('focus', checkFiles);
    fileInput.addEventListener('change', checkFiles);
  });
}

export default openFilePicker;
