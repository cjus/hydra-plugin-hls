# hydra-plugin-hls
Hydra Plugin for use with the [Hydra Logging Service](https://github.com/cjus/hydra-logging-svcs). This plugin adds a log function to hydra and overrides the hydraExpress.log call in order to send log messages to the Hydra Distributed Logging Service.

## Service configuration entry

Configure this plugin by adding a plugins/hydraLogger branch to your hydra configuration. The `logToConsole` entry determines whether the logging is visible in the terminal window your service is running in. The `onlyLogLocally` entry determines whether log entries only appear locally and are not sent to the remote Hydra Logging Service.  Ideally, both entries are set to true, but you may choose to only set `onlyLogLocally` to true, while you're debugging your service locally.

```
  "hydra": {
    "serviceName": "your-service",
    "serviceIP": "",
    "servicePort": 8080,
    "serviceType": "",
    "serviceDescription": "your service description",
    "plugins": {
      "hydraLogger": {
        "logToConsole": true,
        "onlyLogLocally": false
      }
    }
  }
```

## Using the plugin in your service.

This plugin can be used with hydra or hydra-express. To use the plugin you only need to call the hydra or hydraExpress log method. The first param is a log type such as 'error', 'fatal', 'info', 'debug'. You can use a custom log type if you need to.  The second param is either a string or an object.

```
hydra.log('error', 'Oh snap');
hydra.log('info', {
  name: 'Info object'
});
```

## Configure for use with Hydra:

```js
const hydra = require('hydra');
const HydraLogPlugin = require('hydra-plugin-hls/hydra');
hydra.use(new HydraLogPlugin);
:
:
: later
hydra.log('error', 'Oh snap!');
```

## Configure for use with Hydra-Express:

```js
const hydraExpress = require('hydra-express');
const HydraLogPlugin = require('hydra-plugin-hls/hydra-express');
hydraExpress.use(new HydraLogPlugin);
:
:
: later
hydraExpress.log('error', 'Oh snap!');
```
