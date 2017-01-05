"use strict";

const loudness = require('loudness');       // Linux & OS X
const brightness = require('brightness');   // Linux & OS X

module.exports = function () {
    var system = {};

    system.audio = {};

    system.audio.getSystemVolume = function() {
        return new Promise(function(resolve, reject) {
            loudness.getVolume(function(err, vol) {
                if(err) return reject(err);
                resolve(vol);
            });
        });
    };

    system.audio.setSystemVolume = function(vol) {
        return new Promise(function(resolve, reject) {
            loudness.setVolume(vol, function(err) {
                if(err) return reject(err);
                resolve();
            });
        });
    };

    system.audio.isMuted =  function() {
        return new Promise(function(resolve, reject) {
            loudness.getMuted(function(err, muted) {
                if(err) return reject(err);
                resolve(muted);
            });
        });
    };

    system.audio.mute = function(mute) {
        return new Promise(function(resolve, reject) {
            loudness.setMuted(mute, function(err) {
                if(err) return reject(err);
                resolve();
            });
        });
    }

    system.display = {};

    system.display.getBrightness = brightness.get;
    system.display.setBrightness = brightness.set;

    return system;
};