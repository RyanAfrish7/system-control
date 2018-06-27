"use strict";

const assert = require('assert');
const async = require('async');
const system = require('../index.js');

describe('audio', function() {

    var settings = {};

    before(function(done) {
        async.parallel([
            function(callback) {
                system.audio.volume().then(function(vol) {
                    settings.vol = vol; callback();
                }).catch(callback);
            },
            function(callback) {
                system.audio.muted().then(function(muted) {
                    settings.muted = muted; callback();
                }).catch(callback);
            }
        ], done);
    });

    after(function(done) {
        Promise.all([
            system.audio.volume(settings.vol),
            system.audio.muted(settings.muted)
        ]).then(function() {done()}, done);
    });

    describe('#setSystemVolume()', function() {
        it('should set system volume', function(done) {
            system.audio.volume(75).then(function() {
                system.audio.volume().then(function(vol) {
                    if(vol - 75 != 1)
                        assert.equal(vol, 75, "volume set properly");
                    done();
                }).catch(done);
            }).catch(done);
        });
    });

    describe('#mute()', function() {
        it('should mute system volume', function(done) {
            system.audio.muted(true).then(function() {
                system.audio.muted().then(function(muted) {
                    assert.equal(muted, true, "muted successfully");
                    done();
                }).catch(done);
            }).catch(done);
        });
    });

    describe('#unmute()', function() {
        it('should unmute system volume', function(done) {
            system.audio.muted(false).then(function() {
                system.audio.muted().then(function(muted) {
                    assert.equal(muted, false, "unmuted successfully");
                    done();
                }).catch(done);
            }).catch(done);
        });
    });
});

describe('display', function() {

    var settings = {};

    before(function(done) {
        Promise.all([
            system.display.brightness().then(function(brightness) {
                settings.brightness = brightness;
            })
        ]).then(function() {done();}, done);
    });

    after(function(done) {
        Promise.all([
            system.display.brightness(settings.brightness).then(done, done)
        ]);
    });

    describe('#setBrightness()', function() {
        it('should set brightness', function(done) {
            system.display.brightness(0.8).then(function() {
                system.display.brightness().then(function(brightness) {
                    assert.equal(brightness, 0.8, "brightness set successfully"); done();
                }).catch(done);
            }).catch(done);
        });
    });

});
