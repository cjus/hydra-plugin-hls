module.exports = (hydra, config) => {
  /**
   * @name log
   * @summary logs a message
   * @private
   * @param {string} type - type of message: 'info', 'error', 'fatal' or other
   * @param {object / string} message - message to log
   * @return {undefined}
   */
  return (type, message) => {
    let from = `${hydra.getServiceName()}:/`;
    let msg = hydra.createUMFMessage({
      to: 'hls-svcs:/',
      from,
      body: {
        serviceName: from.replace(':/',''),
        serviceVersion: hydra.getServiceVersion(),
        instanceID: hydra.getInstanceID(),
        severity: type,
        body: message
      }
    });
    hydra.sendMessage(msg);
  }
};

