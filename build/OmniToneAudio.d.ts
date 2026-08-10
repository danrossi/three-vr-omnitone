import { EventDispatcher, AudioContext } from 'three';
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
export default class OmniToneAudio extends EventDispatcher<any> {
    constructor(element: any, options: any);
    _audioContext: AudioContext;
    _videoElementSource: any;
    _masterGain: any;
    _channelMap: any[];
    _foaRenderer: any;
    /**
     * Initalize the Omnitone decoder
     * Return promises as events.
     * @param {HtmlMediaElement} element    The video element to use for the deocder
     * @param {object} options  The Omnitone config options
     */
    init(element: HtmlMediaElement, options: object): void;
    set channelMap(value: any[]);
    /**
     * Setter and getter for the channel map
     */
    get channelMap(): any[];
    /**
     * Set the Omnitone decoder's rotation matrix.
     * To be updated with the renderer animation or on controls changes.
     * @param {Float32Array} matrix The Float32Array typed array representation of Matrix3 to be used for the decoder rotation matrix.
     */
    setRotationMatrix(matrix: Float32Array): void;
    /**
    * Set the mode for the deocder
    * Possible options are bypass, none and ambisonic.
    */
    set mode(value: any);
}
