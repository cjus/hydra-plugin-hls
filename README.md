# hydra-plugin-hls
Hydra Plugin for use with the Hydra Logging Service. This plugin adds a log function to hydra and overrides the hydraExpress.log call in order to send log messages to the Hydra Distributed Logging Service.

When using Hydra:

```js
const hydra = require('hydra');
const HydraLogPlugin = require('hydra-plugin-hls/hydra');
hydra.use(new HydraLogPlugin);
:
:
: later
hydra.log('error', 'Oh snap!');
```

When using Hydra Express:

```js
const hydraExpress = require('hydra-express');
const HydraLogPlugin = require('hydra-plugin-hls/hydra-express');
hydraExpress.use(new HydraLogPlugin);
:
:
: later
hydraExpress.log('error', 'Oh snap!');
```
