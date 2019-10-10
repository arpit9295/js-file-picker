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
      if (fileInput.files.length) {
        document.body.removeChild(fileInput);
        resolve(fileInput.files);
      } else {
        document.body.removeChild(fileInput);
        reject(fileInput.files);
      }
    }
    fileInput.addEventListener('focus', checkFiles);
    fileInput.addEventListener('change', checkFiles);
  });
}

export default openFilePicker;
