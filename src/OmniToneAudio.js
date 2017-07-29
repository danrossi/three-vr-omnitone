import { EventDispatcher } from '../../three.js/src/core/EventDispatcher';
import { AudioContext } from '../../three.js/src/audio/AudioContext';
import { OmniToneUtils } from './utils/OmniToneUtils.js';

/**
 * Copyright 2016 Daniel Rossi
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * OmniTone Audio Manager.
 * A helper wrapper for the setup of Omnitone and rotating the matrix.
 * Automatically sets up Safari channel reordering and the AudioContext
 * Pass a video element to the Omnitone decoder which the AudioContext will use the audio tracks from the video element.
 * Omnitone requires native Html5 playback of multi channel audio in audio and video elements of 4 channels or more.
 * @author danrossi / https://github.com/danrossi
 */

class OmniToneAudio extends EventDispatcher {

    constructor( element, options ) {

        super();

        const ua = navigator.userAgent;

        this.audioContext = AudioContext.getContext(),
            this.isSafari = /Safari/.test(ua) && !/Chrome/.test(ua),
            this._channelMap = [],
            this._foaDecoder = null;


        this.init(element, options);

    }

    /**
     * Initalize the Omnitone decoder
     * Return promises as events.
     * @param {HtmlMediaElement} element    The video element to use for the deocder
     * @param {object} options  The Omnitone config options
     */
    init(element, options) {

        //set a required channel map or use the default.
        this.channelMap = options.channelMap || [0, 1, 2, 3];

        //add extra configs like post gain
        const config = {
            postGainDB: options.postGainDB || 0,
            channelMap: this.channelMap
        }

        //if a custom base url is set for self hosted HRTF IR files use this instead.
        if (options.HRTFSetUrl) {
            config.HRTFSetUrl = options.HRTFSetUrl
        }

        //setup the Omnitone decoder
        this._foaDecoder = Omnitone.createFOADecoder(this.audioContext, element, config);

        //set the mode to ambisonic as default which can be changed to "none" externally.
        //this.mode = "ambisonic";

        //initialize the decoder and return the promises as events.
        this._foaDecoder.initialize().then(() => {
            this.dispatchEvent({ type: "omnitoneready" });
        }, (error) => {
            this.dispatchEvent({ type: "omnitoneerror", error: error });
        });

    }

    /**
     * Set the Omnitone decoder's rotation matrix.
     * To be updated with the renderer animation or on controls changes.
     * @param {Float32Array} matrix The Float32Array typed array representation of Matrix3 to be used for the decoder rotation matrix.
     */
    setRotationMatrix( matrix ) {
        this._foaDecoder.setRotationMatrix(matrix);
    }

    /**
     * Setter and getter for the channel map
     */
    get channelMap() {
        return this._channelMap;
    }

    set channelMap(vale) {
        //reorder the configured channel map for Safari.
        if (this.isSafari) OmniToneUtils.channelMapSafari(value);

        this._channelMap = value;
    }

     /**
     * Set the mode for the deocder
     * Possible options are bypass, none and ambisonic.
     */
    set mode(value) {
        this._foaDecoder.setMode(value);
    }
}

export { OmniToneAudio };