const perform = async (z, bundle) => {
  const callbackURL = z.generateCallbackUrl();

  const options = {
    url: `https://api.pulpminer.com/external/zapier/get/${bundle.inputData.api_id}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    params: {},
    body: { callbackURL },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'api_id',
        label: 'API ID',
        type: 'integer',
        helpText:
          'API id is the numeric value found after creating a Pulpminer API. It is the value that comes after the /external/ path.',
        dynamic: 'apiIdTrigger.id',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: { data: null, errors: null },
    outputFields: [
      { key: 'data', label: 'Contains structured data' },
      { key: 'errors', label: 'Contains errors if any' },
    ],
  },
  display: {
    description: 'Consume a GET API created in PulpMiner',
    hidden: false,
    label: 'Use a GET API',
  },
  key: 'get',
  noun: 'GET',
};
