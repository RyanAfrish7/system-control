import {promisify} from 'util';

const platform = process.platform;
let getVolume;
let setVolume;
let getMuted;
let setMuted;
let increase;
let decrease;

let brightness;
let getBrightness;
let setBrightness;

if (platform === 'win32') {
  const {speaker} = require('win-audio');
  brightness = require('win-brightness');
  getBrightness = promisify(brightness.get)
  setBrightness = promisify(brightness.set)

  getVolume = () => speaker.get();
  setVolume = value => speaker.set(value);
  getMuted = () => speaker.isMuted()
  setMuted = async value => {
    if (!value) speaker.unmute();
    else speaker.mute();
  }
  increase = speaker.increase;
  decrease = speaker.decrease;
} else {
  const loudness = require('loudness');
  brightness = require('brightness');
  getBrightness = brightness.get;
  setBrightness = brightness.set;

  getVolume = promisify(loudness.getVolume)
  setVolume = promisify(loudness.setVolume)
  getMuted = promisify(loudness.getMuted)
  setMuted = promisify(loudness.setMuted)
  /**
   * increase volume
   * @param {number} value
   */
  increase = async amount => {
    let volume = await getVolume();
    volume += amount;
    if (volume > 100) volume = 100;
    return setVolume(volume);
  }
  /**
   * decrease volume
   * @param {number} value
   */
  decrease = async amount => {
    let volume = await getVolume();
    volume -= amount;
    if (volume < 0) volume = 0;
    return setVolume(volume);
  }
}
const audio = {

  /**
   * get/set volume
   * @param {number} value set volume/get volume when undefined
   */
  volume: async value => {
    if (value !== undefined) return setVolume(value);
    else return getVolume()
  },

  /**
   * get/set muted
   * @param {boolean} muted set muted/get muted when undefined
   */
  muted: async muted => {
    if (muted !== undefined) return setMuted(muted);
    else return getMuted()
  }

}

const display = {
  /**
   * get/set brightness
   * @param {boolean} value sets brightness/gets brightness when undefined
   */
  brightness: value => {
    if (value !== undefined) return setBrightness(value);
    return getBrightness()
  }

}

export default { audio, display }
