import { default as OmniToneAudio } from './OmniToneAudio';
import { Camera, Matrix4 } from 'three';
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
 * OmniTone position matrix rotation from the Three.js camera.
 * The matrix rotation can be updated with the render animation or on a three.js controls change like with OrbitControls
 * @author danrossi / https://github.com/danrossi
 */
export default class OmniTonePosition {
    /**
     *
     * @param {OmniToneAudio} audio The OmniToneAudio Omnitone wrapper to update the audio rotation matrix to.
     * @param {Camera} camera The Three.js camera object to obtain matrix / quartonion values from.
     * @constructor
     */
    constructor(audio: OmniToneAudio, camera: Camera);
    /**
     * OmnitoneAudio.
     *
     * @type {OmniToneAudio}
     */
    audio: OmniToneAudio;
    /**
     * The three Camera.
     *
     * @type {Camera}
     */
    camera: Camera;
    /**
     * Update the rotation matrix from the camera's current matrix.
     * Quartonion can be used also but still unsure what the best method is.
     */
    update(): void;
    /**
     * Convert the Camera's matrix in Matrix4 format, convert to a 3x3 matrix with Matrix3, then update the Omnitone rotation matrix.
     * @param {Matrix4} matrix - The rotation matrix
     */
    setRotationFromMatrix(matrix: Matrix4): void;
}
