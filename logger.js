module.exports = (hydra, config) => {
  /**
   * @name log
   * @summary logs a message
   * @param {string} type - type of message: 'info', 'error', 'fatal' or other
   * @param {object / string} message - message to log
   * @return {undefined}
   */
  return (type, message) => {
    if (!hydra.config.plugins || !hydra.config.plugins.hydraLogger) {
      console.error('Missing hydraLogger section in app config. See docs at: https://github.com/cjus/hydra-plugin-hls')
      return;
    }

    let from = `${hydra.getServiceName()}:/`;
    let ts = new Date().getTime() / 1000 | 0;
    let settings = hydra.config.plugins.hydraLogger;

    if (settings.logToConsole === true) {
      let text = (typeof message === 'string') ? message : JSON.stringify(message);
      console.log(`${ts} ${type} ${from.replace(':/','')} | ${text}`);
    }

    if (!settings.onlyLogLocally && message !== 'Unavailable hydra-logger-svcs instances') {
      let msg = hydra.createUMFMessage({
        to: 'hydra-logging-svcs:/',
        from,
        body: {
          ts,
          serviceName: from.replace(':/',''),
          serviceVersion: hydra.getInstanceVersion(),
          instanceID: hydra.getInstanceID(),
          severity: type,
          body: message
        }
      });
      hydra.sendMessage(msg);
    }
  }
};

