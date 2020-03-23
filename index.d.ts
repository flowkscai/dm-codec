declare module 'dm-codec' {
    interface Bitmap {
        width: number;
        height: number;
        data: Uint8Array;
    }

    interface DmEncodeResult extends Bitmap {
        channels: number;
    }

    interface DmDecodeOptions extends Bitmap {
        /**
         * Number of channels in the image
         * If not specified, will computing by <data length / width / height>
         */
        channels?: number;
        /**
         * Pixels
         */
        data: Uint8Array | Buffer;
        /**
         * Stop scan after N milliseconds
         */
        timeout?: number;
        /**
         * Internally shrink image by a factor of N
         */
        shrink?: number;
        /**
         * Allowed non-squareness of corners in degrees (0-90)
         */
        squareDevnDeg?: number;
        /**
         * Ignore weak edges below threshold N (1-100)
         */
        threshold?: number;
    }

    export function encode(text: string): DmEncodeResult;
    export function decode(opts: DmDecodeOptions): string;
}
