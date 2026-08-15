import { AudioContext, EventDispatcher } from "three";
import Omnitone from "omnitone/build/omnitone.min.esm.js";
//#region src/utils/OmniToneUtils.js
var OmniToneUtils = class {
	static get isSafari() {
		const ua = navigator.userAgent;
		return /Safari/.test(ua) && !/Chrome/.test(ua);
	}
	static channelMapSafari(channels) {
		channels.splice(0, 0, channels.splice(2, 1)[0]);
		return channels;
	}
	static getOmniTone(audioContext, config) {
		switch (config.ambisonicOrder) {
			case 2:
			case 3: return Omnitone.createHOARenderer(audioContext, config);
			default: return Omnitone.createFOARenderer(audioContext, config);
		}
	}
};
//#endregion
//#region src/OmniToneAudio.js
var OmniToneAudio = class extends EventDispatcher {
	constructor(element, options) {
		super();
		this._audioContext = AudioContext.getContext();
		this._videoElementSource = this._audioContext.createMediaElementSource(element);
		this._masterGain = this._audioContext.createGain();
		this._channelMap = [];
		this._foaRenderer = null;
		this.init(options);
	}
	init(options) {
		const config = {
			postGain: 1,
			ambisonicOrder: 1,
			channelMap: [
				0,
				1,
				2,
				3
			]
		};
		Object.assign(config, options, {});
		this.channelMap = config.channelMap;
		this._foaRenderer = OmniToneUtils.getOmniTone(this._audioContext, {
			channelMap: this.channelMap,
			ambisonicOrder: config.ambisonicOrder
		});
		this._masterGain.gain.value = config.postGain;
		this._foaRenderer.output.connect(this._masterGain);
		this._foaRenderer.initialize().then(() => {
			this._videoElementSource.connect(this._foaRenderer.input);
			this._masterGain.connect(this._audioContext.destination);
			this.dispatchEvent({ type: "omnitoneready" });
		}, (error) => {
			this.dispatchEvent({
				type: "omnitoneerror",
				error
			});
		});
	}
	setRotationMatrix(matrix) {
		this._foaRenderer.setRotationMatrix4(matrix);
	}
	get channelMap() {
		return this._channelMap;
	}
	set channelMap(value) {
		if (OmniToneUtils.isSafari) OmniToneUtils.channelMapSafari(value);
		this._channelMap = value;
	}
	set mode(value) {
		this._foaRenderer.setRenderingMode(value);
	}
};
//#endregion
//#region src/OmniTonePosition.js
var OmniTonePosition = class {
	constructor(audio, camera) {
		this.audio = audio;
		this.camera = camera;
	}
	update() {
		this.camera.updateMatrix();
		this.setRotationFromMatrix(this.camera.matrix.elements);
	}
	setRotationFromMatrix(matrix) {
		this.audio.setRotationMatrix(matrix);
	}
};
//#endregion
export { OmniToneAudio, OmniTonePosition };
