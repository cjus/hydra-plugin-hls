const HydraPlugin = require('hydra/plugin');

class HydraHLSPlugin extends HydraPlugin {
  constructor(config = {}) {
    super('hydra-plugin-hls');
    this.config = config;
  }

  setHydra(hydra) {
    super.setHydra(hydra);
  }

  setConfig(hConfig) {
    super.setConfig(hConfig);

    this.config.hydra = hConfig;
    this.configChanged(this.opts);
  }

  configChanged(opts = {}) {
    this.config = Object.assign(this.config, opts);
  }

  onServiceReady() {
    this.hydra.log = require('../logger')(this.hydra, this.config);
  }
}

module.exports = {
  HydraHLSPlugin
};
