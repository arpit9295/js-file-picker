import { debounce } from 'underscore';

function openFilePicker(cloakStyle, options = {}) {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.style = cloakStyle;

  Object.keys(options).forEach((attribute) => {
    fileInput.setAttribute(attribute, options[attribute]);
  });

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      // Clean up event listeners
      fileInput.removeEventListener('change', handleChange);
      fileInput.removeEventListener('blur', handleBlur);

      // Remove from DOM if still attached
      if (fileInput.parentNode === document.body) {
        document.body.removeChild(fileInput);
      }
    };

    const handleChange = () => {
      if (fileInput.files.length) {
        resolve(fileInput.files);
      } else {
        reject(new Error('No files selected'));
      }
      cleanup();
    };

    const handleBlur = () => {
      // Only cleanup on blur if no files were selected
      if (!fileInput.files.length) {
        cleanup();
        reject(new Error('File selection cancelled'));
      }
    };

    fileInput.addEventListener('change', handleChange);
    fileInput.addEventListener('blur', handleBlur);

    // Append to body and trigger click with small delay
    document.body.appendChild(fileInput);
    
    // Use setTimeout to ensure proper event sequencing
    setTimeout(() => {
      fileInput.click();
    }, 100);
  });
}

export default openFilePicker;
