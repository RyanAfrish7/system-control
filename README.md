# system-control
Node.js module to configure basic system parameters (brightness and system-control).
The module uses JS Promise for supporting async calls.

Usage
-----

```javascript
const system = require('system-control')();
```

Brightness
----------

Brightness can be read and modified easily by accessing the `display` object of the `system`.

```javascript
const system = require('system-control')();

// NOTE: The following example illustrates usage of both `getBrightness` and
// `setBrightness`. But, they will be executed asynchronously and not serially.

system.display.getBrightness().then(function(brightness) {
  // here comes your code
});

system.display.setBrightness(brightness).then(function() {
  // here comes your code
});
```

Audio
-----


System volume can be read and modified with the help of the `audio` object of the `system`.

```javascript
const system = require('system-control')();

// NOTE: The following example illustrates usage of both `getSystemVolume`,
// `setSystemVolume`, `isMuted`, `mute`. But, they will be executed
// asynchronously and not serially.

system.display.getSystemVolume().then(function(volume) {
  // here comes your code
});

system.display.setSystemVolume(volume).then(function() {
  // here comes your code
});

system.display.isMuted().then(function(muted) {
  // here comes your code
});

system.display.mute(mute).then(function() {
  // here comes your code
});
```
