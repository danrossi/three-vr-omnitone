import { EventDispatcher } from 'three';
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
    /**
     * Constructs a new XRGamepad
     *
     * @param {HTMLMediaElement} element =  The video element to use for the deocder.
     * @param {Object} options - The options.
     */
    constructor(element: HTMLMediaElement, options: Object);
    /**
     * The AudioContext
     *
     * @private
     * @type {AudioContext}
     */
    private _audioContext;
    /**
     * Video element source node
     *
     * @private
     * @type {MediaElementAudioSourceNode}
     */
    private _videoElementSource;
    /**
     * The master gain node.
     *
     * @private
     * @type {GainNode}
     */
    private _masterGain;
    /**
     * The channel map.
     *
     * @private
     * @type {number[]}
     */
    private _channelMap;
    /**
     * The foa renderer.
     *
     * @private
     * @type {any}
     */
    private _foaRenderer;
    /**
     * Initalize the Omnitone decoder
     * Return promises as events.
     * @param {Object} options  The Omnitone config options
     */
    init(options: Object): void;
    /**
     * Set the custom channel map.
     * @param {number[]} value The channel map.
     */
    set channelMap(value: number[]);
    /**
     * Setter and getter for the channel map
     * @returns {number[]} The channel map.
     */
    get channelMap(): number[];
    /**
     * Set the Omnitone decoder's rotation matrix.
     * To be updated with the renderer animation or on controls changes.
     * @param {Float32Array} matrix The Float32Array typed array representation of Matrix3 to be used for the decoder rotation matrix.
     */
    setRotationMatrix(matrix: Float32Array): void;
    /**
     * Set the mode for the deocder
     * Possible options are bypass, none and ambisonic.
     * @param {"bypass" | "none" | "ambisonic"} value The rendering mode.
     */
    set mode(value: "bypass" | "none" | "ambisonic");
}
