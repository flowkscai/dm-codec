# dm-codec

node.js package, wrapper around [libdmtx](http://libdmtx.sourceforge.net/) for encoding and decoding datamatrix tags.

## Install

This package depends on [libdmtx](http://libdmtx.sourceforge.net/) being installed and available on your system. You can find instructions on how to install it [here](http://libdmtx.wikidot.com/general-instructions). After that is installed, proceed with...

```
npm install dm-codec
```

Note for OSX users: you can alternatively use `brew install libdmtx`.

## Usage

```
const dmCodec = require("dm-codec");
```

### Encoding

```
dmCodec.encode("The text to encode in a datamatrix");
```

It returns an object with the following properties:

* data: an array of pixels representing the datamatrix tag
* width: the width of the resulting pixels
* height: the height of the resulting pixels
* channels: the channels count of the resulting pixels

### Decoding

```
dmCodec.decode({
  width: colsCount,
  height: rowsCount,
  data: pixels,
  ...otherOptions
});
```

where data is a [Buffer](https://nodejs.org/api/buffer.html) or [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).

It returns a text or throw an error:

* text: the content of the datamatrix tag
