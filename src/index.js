import pickFile from './pickFile';

const config = {
  cloakStyle: 'opacity: 0; position: absolute; bottom: 0;',
};

function pick(...args) {
  return pickFile(config.cloakStyle, ...args);
}

export {
  pick as pickFile,
};

export default {
  config,
  pick,
};
