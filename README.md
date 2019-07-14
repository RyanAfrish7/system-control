# system-control
Node.js module to configure basic system parameters (brightness and system-control).

## Usage
```js
const { audio } = require('system-control');

audio.volume().then(volume => console.log(volume)) // get system volume
audio.volume(80)
  .then(() => console.log('volume changed')) // set system volume
  .catch((err) => console.error(err));
```
```js
import { audio } from 'system-control';

(async () => {
  const volume = await audio.volume() // get system volume
  try {
    await audio.volume(80) // set system volume
    console.log(`volume changed from ${volume} to 80`)
  } catch (e) {
    console.error(e);
  }
})()
```

## API
### systemControl.audio([options])
#### volume
`value`: number | undefined<br>
```js
await audio.volume(10) // set volume
await audio.volume() // get volume
```

#### muted
`value`: boolean | undefined<br>
```js
await audio.muted(true) // set muted
await audio.muted() // get muted
```

#### increase
`value`: number | undefined<br>
```js
await audio.increase(10) // increase volume
```

#### decrease
`value`: number | undefined<br>
```js
await audio.decrease(10) // decrease volume
```

### systemControl.display([options])
#### brightness
`value`: number | undefined<br>
```js
await display.brightness(10) // set brightness
await display.brightness() // get brightness
```
