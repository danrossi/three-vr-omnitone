import { Matrix3 } from '../../three.js/src/math/Matrix3';
import { mat3 } from './gl-matrix/mat3.js';

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

/**
 *
 * @param {THREE.OmniToneAudio} audio The OmniToneAudio Omnitone wrapper to update the audio rotation matrix to.
 * @param {THREE.Camera} camera The Three.js camera object to obtain matrix / quartonion values from.
 * @constructor
 */
function OmniTonePosition( audio, camera ) {
    this.audio = audio, this.camera = camera, this._rotationMatrix = mat3.create();
}

OmniTonePosition.prototype =  {

    constructor: OmniTonePosition,

    /**
     * Update the rotation matrix from the camera's current matrix.
     * Quartonion can be used also but still unsure what the best method is.
     */
    update: function () {
        this.camera.updateMatrix();
        this.setRotationFromMatrix(this.camera.matrix.elements);
        //this.setRotationMatrixFromQuart(this.camera.quaternion);
    },

    /**
     * Convert the Camera's matrix in Matrix4 format, convert to a 3x3 matrix with Matrix3, then update the Omnitone rotation matrix.
     * @param {THREE.Matrix4} matrix
     */
    setRotationFromMatrix: function (matrix) {
        //couldn't work out how quickly perform a Matrix4 to Matrix3 conversion so use parts of the gl-matrix math library.
        mat3.fromMat4(this._rotationMatrix, matrix);
        //update the audio matrix with a Float32Array typed array of the Matrix3
        this.audio.setRotationMatrix(this._rotationMatrix);
    },

    /**
     * If the Camera's matrix is not suitable as it requires also updating the matrix manually use the Camera's quartion camera camera.quartonion.
     * The matrix takes into account both position and quartion. Doing such transform might not perform well compared to just convertin the quartion to a Matrix3.
     * @param quart
     */
    setRotationMatrixFromQuart: function ( quart ) {
        //couldn't work out how quickly perform a quartonion to Matrix3 conversion so use parts of the gl-matrix math library.
        mat3.fromQuat(this._rotationMatrix, quart.toArray());
        //update the audio matrix with a Float32Array typed array of the Matrix3
        this.audio.setRotationMatrix(this._rotationMatrix);
    }

};



export { OmniTonePosition };
