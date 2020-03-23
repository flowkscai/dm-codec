#include <iostream>
#include "napi.h"
#include "datamatrix.h"

using namespace std;

DataMatrix dm;

Napi::Value encode(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    string text = info[0].As<Napi::String>();
    dm_data data;
    dm.encode(text, data);
    Napi::Object result = Napi::Object::New(env);
    result.Set("width", Napi::Number::New(env, data.width));
    result.Set("height", Napi::Number::New(env, data.height));
    result.Set("channels", Napi::Number::New(env, data.channels));
    int nPixels = (int)data.pixels.size();
    Napi::Uint8Array pixels = Napi::Uint8Array::New(env, nPixels);
    for (int i = 0; i < nPixels; i++) {
        pixels.Set(i, Napi::Number::New(env, data.pixels[i]));
    }
    result.Set("data", pixels);
    return result;
}

Napi::String decode(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    string decodedText;

    Napi::Object obj = info[0].As<Napi::Object>();
    dm_image image;
    image.rows = obj.Get("width").ToNumber();
    image.cols = obj.Get("height").ToNumber();
    image.channels = obj.Get("channels").ToNumber();
    image.data = (unsigned char *) obj.Get("data").As<Napi::Uint8Array>().ArrayBuffer().Data();

    dm_decode_opts decodeOpts;
    decodeOpts.timeout = obj.Get("timeout").ToNumber();
    decodeOpts.shrink = obj.Get("shrink").ToNumber();
    decodeOpts.squareDevnDeg = obj.Get("squareDevnDeg").ToNumber();
    decodeOpts.threshold = obj.Get("threshold").ToNumber();
    
    try {
        dm.decode(image, decodeOpts, decodedText);
    } catch (string e) {
        Napi::Error::New(env, e).ThrowAsJavaScriptException();
    }

    return Napi::String::New(env, decodedText);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("encode", Napi::Function::New(env, encode));
    /*
     * image:
     *  - rows
     *  - cols
     *  - channels
     * data (pixels)
     * timeout (optional - default 1000ms)
     */
    exports.Set("decode", Napi::Function::New(env, decode));
    return exports;
}

NODE_API_MODULE(dmCodec, Init)
