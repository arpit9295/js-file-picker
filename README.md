# JS File Picker

A bare-bones library to open file picker programatically.

## Install

```
npm install --save js-file-picker
```

Usage -

```js
import { openFilePicker } from 'js-file-picker';

async function uploadFile() {
  options = {
    accept: '.jpg, .jpeg, .png',
    multiple: true,
  }

  const filePromise = openFilePicker(options);

  try {
    const fileList = await filePromise;
    return fileList; // fileList instanceof FileList === true [https://developer.mozilla.org/en-US/docs/Web/API/FileList]
  } catch () {
    console.error('file picker was closed without input');
  }
}
```

In certain cases, you might have to change the default styling for the file input.

```js
import FilePicker from 'js-file-picker';

FilePicker.config.cloakStyle = 'opacity: 0; position: absolute; bottom: 0; z-index: 0';

const filePromise = FilePicker.open();
```
## Development setup

```
npm install
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## License

[MIT](https://github.com/arpit9295/vue-weekly-schedule/blob/master/LICENSE.md)
