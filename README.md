# JS Pick File

[![npm](https://img.shields.io/npm/v/js-pick-file.svg)](https://www.npmjs.com/package/js-pick-file)

A bare-bones vanilla library to open file picker programatically.

[Demo](https://codepen.io/arpit9295/full/QWWOogW)

## Install

```
npm install --save js-pick-file
```

## Usage -

```js
import { pickFile } from 'js-pick-file';

async function uploadFile() {
  options = {
    accept: '.jpg, .jpeg, .png',
    multiple: true,
  }

  const filePromise = pickFile(options);

  try {
    const fileList = await filePromise;
    return fileList;
  } catch () {
    console.error('file picker was closed without input');
  }
}
```

`pickFile()` returns a promise that resolves to a [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)

If you see an input box flashing on your system or sudden whitespace issues, you might have to change the default styling for the file input.

```js
import FilePicker from 'js-pick-file';

FilePicker.config.cloakStyle = 'opacity: 0; position: absolute; bottom: 0; z-index: 0';

const filePromise = FilePicker.pick();
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

[MIT](https://github.com/arpit9295/js-pick-file/blob/master/LICENSE.md)
