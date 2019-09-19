const blacklist = require('./node_modules/metro/src/blacklist');

    module.exports = {
      getBlacklistRE() {
        return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
      },
    };
