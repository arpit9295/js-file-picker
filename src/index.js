import openFilePicker from './openFilePicker';

const config = {
  cloakStyle: 'opacity: 0; position: absolute; bottom: 0;',
};

function open(...args) {
  return openFilePicker(config.cloakStyle, ...args);
}

export {
  open as openFilePicker,
};

export default {
  config,
  open,
};
