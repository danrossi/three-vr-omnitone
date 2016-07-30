# Omnitone Three.js Manager And Rotation Controller

[Omnitone](https://github.com/GoogleChrome/omnitone) decoder is a spatial audio implementation for WebVR purposes.

Content for spatial media is required to be packaged to the [Google spatial media](https://github.com/google/spatial-media) specification using the available tools.

This feature is designed as a Three.js module. It works similar as the example controls. Requiring updating after rotation of the Three.js camera to use it's matrix/quartonion
data to rotate the audio with the Omnitone decoder.

## Building

This could be packaged externally from Three.js. But for now, these modules can be built directly into three.js by updating it's main project file with an include like so

```js
export { OmniToneAudio } from '../three-vr-omnitone/src/OmniToneAudio.js';
export { OmniTonePosition } from '../three-vr-omnitone/src/OmniTonePosition.js';
```

These can be accessed as THREE.OmniToneAudio and THREE.OmniTonePosition.

The main project file can be stored externally from Three.js and include paths updated. 



## Usage

```js
var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);

var config = {
    //custom base url to HRTF set. Not required.
    HRTFSetUrl: "",
    //custom channel map. Not required.
    channelMap: null,
    //post decoding and convolution gain. Not required.
    postGainDB: 0
};

var audio = new THREE.OmniToneAudio(video, config);
var audioPosition = new THREE.OmniTonePosition(audio, camera);

```

Within a render animation or a controls update event. Run a call to the audio position update,

```js
function animate() {
   if ( video.readyState >= video.HAVE_CURRENT_DATA ) {
        texture.needsUpdate = true;
   }

   renderer.render(scene, camera);

   audioPosition.update();
}
```

Within an OrbitControls change event.

```js
 controls.addEventListener("change", function(e) {
    audioPosition.update();
 });
```


#### Methods

```js
audioPosition.enable();   // update the rotation of the Omnitone decoder.
audio.mode = "ambisonic";  // set the mode of the Omnitone deocder.
audio.setRotationMatrix([]) // set the rotation matrix of the Omnitone decoder with a Float32Array typed array of the Camera matrix or quartonion.
```

## License

Copyright 2016 Daniel Rossi.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

