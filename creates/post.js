const perform = async (z, bundle) => {
  const callbackURL = z.generateCallbackUrl();

  const options = {
    url: `https://api.pulpminer.com/external/zapier/post/${bundle.inputData.api_id}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    params: {},
    body: z.JSON.stringify({
      callbackURL,
      inputData: bundle.inputData.post_body
    }),
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
      {
        key: 'post_body',
        label: 'POST Body',
        type: 'text',
        helpText:
          "Post Body for an API can be found in the specific API in the 'Saved API' page.",
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    outputFields: [
      { key: 'data', label: 'Contains all structured data' },
      { key: 'errors', label: 'Contains errors if any' },
    ],
    sample: { data: null, errors: null },
  },
  display: {
    description: 'Consume a POST API created in PulpMiner',
    hidden: false,
    label: 'Use a POST API',
  },
  key: 'post',
  noun: 'POST',
};
