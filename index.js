const authentication = require('./authentication');
const apiIdTriggerTrigger = require('./triggers/api_id_trigger.js');
const getCreate = require('./creates/get.js');
const postCreate = require('./creates/post.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  requestTemplate: {
    params: {},
    headers: { apikey: '{{bundle.authData.apikey}}' },
  },
  triggers: { [apiIdTriggerTrigger.key]: apiIdTriggerTrigger },
  creates: { [getCreate.key]: getCreate, [postCreate.key]: postCreate },
  searches: {},
};
