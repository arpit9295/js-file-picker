import openFilePicker from './openFilePicker';

const config = {
  cloakStyle: 'visibility: hidden; position: absolute; bottom: 0;',
};

function open(...args) {
  openFilePicker(config.cloakStyle, ...args);
}

export {
  open as openFilePicker,
};

export default {
  config,
  open,
};
