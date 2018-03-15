module.exports = (hydra, config) => {
  /**
   * @name log
   * @summary logs a message
   * @param {string} type - type of message: 'info', 'error', 'fatal' or other
   * @param {object / string} message - message to log
   * @return {undefined}
   */
  return (type, message) => {
    if (!hydra.initialized) {
      return;
    }
    if (!hydra.config.plugins || !hydra.config.plugins.hydraLogger) {
      console.error('Missing hydraLogger section in app config. See docs at: https://github.com/cjus/hydra-plugin-hls')
      return;
    }

    let from = `${hydra.getServiceName()}:/`;
    let fromName = from.replace(':/','');
    let ts = new Date().getTime() / 1000 | 0;
    let settings = hydra.config.plugins.hydraLogger;

    if (settings.logToConsole === true) {
      let text;
      if (typeof message === 'string') {
        text = message;
      } else {
        const Utils = hydra.getUtilsHelper();
        text = Utils.safeJSONStringify(message);
      }
      console.log(`${ts} ${type.toUpperCase()} ${fromName} | ${text}`);
    }

    if (!settings.onlyLogLocally && message !== 'Unavailable hydra-logger-svcs instances') {
      let msg = hydra.createUMFMessage({
        to: 'hydra-logging-svcs:/',
        from,
        body: {
          ts,
          serviceName: fromName,
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

