'use strict';

const getPixels = require("get-pixels");
const savePixels = require("save-pixels")
const dmCodec = require("../index.js");
const ndarray = require("ndarray");
const fs = require("fs");

describe("encode", function() {
    it("should encode correctly", function(done) {
        const res = dmCodec.encode("hello, world");

        res.width.should.equal(100);
        res.height.should.equal(100);
        res.channels.should.equal(3);
        res.data.length.should.equal(100 * 100 * 3);

        done();
    });
});

const decodePixels = function (err, pixels) {
    if (err) {
        err.should.be.null();
    } else {
        var data = Buffer.from(pixels.data);
        return dmCodec.decode({
            width: pixels.shape[0],
            height: pixels.shape[1],
            channels: pixels.shape[2],
            data,
            timeout: 100
        });
    }
}

describe("decode", function() {
    it("should decode correctly", function(done) {
        getPixels("./test/image.png", function(err, pixels) {
        //getPixels("http://datamatrix.kaywa.com/img.php?s=6&d=Hello%20DmCreator", function(err, pixels) {
            const text = decodePixels(err, pixels);
            text.should.equal("Hello DmCreator");
            done();
        });
    });

    it("should decode what it encoded", function(done) {
        const encode = dmCodec.encode("hello");
        var image = ndarray(encode.data, [encode.width, encode.height, encode.channels])
        var output = fs.createWriteStream("test/output.png");
        var stream = savePixels(image, "png").pipe(output);
        stream.on("finish", function() {
            getPixels("./test/output.png", function(err, pixels) {
                const text = decodePixels(err, pixels);
                text.should.equal("hello");
                done();
            });
        });
    });
});
