{
    "targets": [{
        "target_name": "dm-codec",
        "sources": [
            "src/dm-codec.cc",
            "src/datamatrix.cc"
        ],
        "include_dirs" : [
            "<!@(node -p \"require('node-addon-api').include\")"
        ],
        'cflags!': [ '-fno-exceptions' ],
        'cflags_cc!': [ '-fno-exceptions' ],
        'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'CLANG_CXX_LIBRARY': 'libc++',
            'MACOSX_DEPLOYMENT_TARGET': '10.7',
        },
        'msvs_settings': {
            'VCCLCompilerTool': { 'ExceptionHandling': 1 },
        },
        'defines': [ 'NAPI_CPP_EXCEPTIONS' ],
        'conditions': [
            ['OS=="mac"', {
                "include_dirs": [
                    "/usr/local/include/"
                ],
                "libraries": [
                    "-L/usr/local/lib",
                    "libdmtx.dylib"
                ],
                'cflags+': ['-fvisibility=hidden'],
                'xcode_settings': {
                    'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES',
                }
            }],
            ['OS=="linux"', {
                "libraries": [
                    "<!(echo /usr/lib/`(which dpkg-architecture > /dev/null && echo \`dpkg-architecture -qDEB_HOST_GNU_TYPE\`/) || echo`libdmtx.so)"
                ]
	        }],
        ]
    }],
}
