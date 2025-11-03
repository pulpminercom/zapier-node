const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.pulpminer.com/external/api/url',
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    params: {
      pageSize: '100',
      page: bundle.meta.page + 1,
    },
    removeMissingValuesFrom: {
      body: false,
      params: false,
    },
  };

  return z.request(options).then((response) => {
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results.data;
  });
};

module.exports = {
  operation: { perform: perform, canPaginate: true },
  display: {
    description: 'Used to get the API Id for a user account',
    hidden: true,
    label: 'API ID',
  },
  key: 'apiIdTrigger',
  noun: 'API ID ',
};
