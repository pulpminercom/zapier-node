const zapier = require('zapier-platform-core');
const nock = require("nock")

// Use this to make test calls into your app:
const App = require('../../index');
const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.get', () => {
  it('should run', async () => {
    const bundle = {
      inputData: {
        api_id: "100"
      }
    };

    nock('https://api.pulpminer.com')
      .post('/external/zapier/get/100', {
        callbackURL: "https://auth-json-server.zapier-staging.com/echo"
      })
      .reply(201, {
        data: {
          _sys_message_: `Job created for https://example.com`
        },
        errors: null
      })

    const results = await appTester(
      App.creates['get'].operation.perform,
      bundle,
    );
    expect(results).toBeDefined();
    expect(results).toEqual({
      data: {
        _sys_message_: `Job created for https://example.com`
      },
      errors: null
    });
  });
});
