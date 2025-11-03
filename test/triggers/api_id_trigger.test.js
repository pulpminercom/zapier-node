const zapier = require('zapier-platform-core');
const nock = require("nock")

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('triggers.apiIdTrigger', () => {
  it('should run', async () => {
    const bundle = {
      meta: {
        page: 0,
      }
    };

    nock('https://api.pulpminer.com')
      .get('/external/api/url?pageSize=100&page=1')
      .reply(200, {
        data: [{ id: "1", "name": "item 1" }, { id: "2", "name": "item 2" }],
        errors: null
      })

    const results = await appTester(
      App.triggers['apiIdTrigger'].operation.perform,
      bundle,
    );
    expect(results).toBeDefined();
    expect(results).toEqual([{ id: "1", "name": "item 1" }, { id: "2", "name": "item 2" }]);
  });
});
