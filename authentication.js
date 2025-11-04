const connectionLabel = async (z, bundle) => {
  return `Using ${bundle.testData.data.name}'s Account`;
};

module.exports = {
  type: 'custom',
  test: {
    headers: { apikey: '{{bundle.authData.apikey}}' },
    removeMissingValuesFrom: { body: false, params: false },
    url: 'https://api.pulpminer.com/external/zapier/auth',
  },
  fields: [
    {
      helpText:
        'You can get the API Key from the [Saved APIs](https://pulpminer.com/api/) page.',
      computed: false,
      key: 'apikey',
      required: true,
      label: 'API Key',
      type: 'string',
    },
  ],
  customConfig: {},
  connectionLabel: connectionLabel,
};
