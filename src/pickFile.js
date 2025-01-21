import { debounce } from 'underscore';

function openFilePicker(cloakStyle, options = {}) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  
  // Set default positioning styles for better MacOS compatibility
  const defaultStyle = 'position: fixed; top: -1000px; left: -1000px; opacity: 0;';
  fileInput.style = `${defaultStyle} ${cloakStyle || ''}`;

  Object.keys(options).forEach((attribute) => {
    fileInput.setAttribute(attribute, options[attribute]);
  });

  document.body.appendChild(fileInput);
  fileInput.click();

  return new Promise((resolve, reject) => {
    let isHandled = false;
    
    function cleanup() {
      if (fileInput.parentNode === document.body) {
        document.body.removeChild(fileInput);
      }
    }

    function handleFiles() {
      if (isHandled) {
        return;
      }
      isHandled = true;

      if (this.files && this.files.length) {
        resolve(this.files);
      } else {
        reject(new Error('No files selected'));
      }
      
      cleanup();
    }

    // Handle the cancel case
    function handleCancel() {
      if (isHandled) {
        return;
      }
      isHandled = true;
      
      reject(new Error('File selection cancelled'));
      cleanup();
    }

    fileInput.addEventListener('change', handleFiles);
    
    // Handle the case when user cancels the selection
    // We need to detect when the dialog closes without a selection
    window.setTimeout(function() {
      if (!isHandled) {
        handleCancel();
      }
    }, 1000);
  });
}

export default openFilePicker;
