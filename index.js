const assert = require('assert');
const dmCodec = require('bindings')('dm-codec.node');

function encode(text) {
    assert(typeof text === 'string');
    return dmCodec.encode(text);
}

function checkInteger(val) {
    assert(typeof val === 'number');
    assert(Number.isSafeInteger(val));
}

function getInteger(obj, key, defaultVal) {
    let val = obj[key];
    if (typeof val === 'undefined') {
        val = defaultVal;
    }
    checkInteger(val);
    return val;
}

function decode(opts) {
    checkInteger(opts.width);
    checkInteger(opts.height);
    assert(opts.data instanceof Uint8Array || opts.data instanceof Buffer);

    const channels = opts.channels || (opts.data.length / opts.width / opts.height);
    checkInteger(channels);

    const timeout = getInteger(opts, 'timeout', 1000);
    const shrink = getInteger(opts, 'shrink', 1);
    const squareDevnDeg = getInteger(opts, 'squareDevnDeg', 50);
    const threshold = getInteger(opts, 'threshold', 10);

    return dmCodec.decode({
        width: opts.width,
        height: opts.height,
        channels,
        data: opts.data,
        timeout,
        shrink,
        squareDevnDeg,
        threshold
    });
}

module.exports = { encode, decode };
