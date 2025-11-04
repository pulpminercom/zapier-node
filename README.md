## PulpMiner Zapier Integration

PulpMiner lets you convert any webpage into a realtime JSON API. This repository contains the Zapier CLI app that connects PulpMiner to your Zaps so you can consume the structured data from your PulpMiner APIs directly in Zapier.

### Requirements

- **Node.js**: >= v22
- **Zapier Platform Core**: 18.0.0 (handled via dependencies)
- A PulpMiner account and an **API Key** from the PulpMiner dashboard

### Authentication

This app uses a simple API Key authentication.

- When adding this app in Zapier, you will be prompted for an **API Key**.
- You can find the API Key on your PulpMiner "Saved APIs" page.

### Available Actions

The integration exposes actions to consume your saved PulpMiner APIs. Both actions return a uniform shape:

- `data`: Contains the structured response from your API
- `errors`: Contains errors if any occurred

#### Use a GET API

- **Label**: Use a GET API
- **Key**: `get`
- **What it does**: Triggers execution of a GET-type PulpMiner API and returns the parsed result to your Zap.
- **Inputs**:
  - `API ID` (integer, required): Numeric ID of your PulpMiner API. It’s the value after the `/external/` path in the API URL.

#### Consume a POST API

- **Label**: Consumes a POST API
- **Key**: `post`
- **What it does**: Triggers execution of a POST-type PulpMiner API with a JSON body and returns the parsed result to your Zap.
- **Inputs**:
  - `API ID` (integer, required): Numeric ID of your PulpMiner API. It’s the value after the `/external/` path in the API URL.
  - `POST Body` (text, required): The JSON body for the API call. You can copy the sample from the specific API in PulpMiner ("Saved API").

### Using in Zapier

1. Add the PulpMiner app to your Zap.
2. Connect your account using your PulpMiner **API Key**.
3. Choose either:
   - "Use a GET API" and select your API via `API ID`.
   - "Consumes a POST API" and provide both `API ID` and a valid JSON `POST Body`.
4. Test the action to see the structured `data` output.
5. Map the fields in subsequent Zap steps as needed.

### Local Development

This repository is a Zapier CLI app. To work on it locally:

1. Ensure Node.js >= v22 is installed.
2. Install dependencies:

```bash
npm ci
```

3. Run tests:

```bash
npm test
```

4. Typical Zapier CLI workflows (if you have the Zapier CLI set up):

```bash
# If needed, install the Zapier CLI first
npm i -g zapier-platform-cli@13

# Log in and link (requires appropriate Zapier account access)
zapier login

# Validate and build
zapier validate
zapier build

# Push a new version (requires permissions)
zapier push
```

Note: This repo is marked `private: true` and is intended to be managed by maintainers with access to the Zapier app. End users should install and use the published Zapier app rather than running this locally.

### Project Structure

- `index.js`: App entrypoint, wires authentication, triggers, and actions
- `authentication.js`: API Key auth and connection test
- `triggers/api_id_trigger.js`: Hidden trigger to fetch available API IDs
- `creates/get.js`: Action to run a GET-type PulpMiner API
- `creates/post.js`: Action to run a POST-type PulpMiner API
- `test/`: Jest tests and fixtures (if present)

### Troubleshooting

- Ensure your PulpMiner **API Key** is valid and has access to the target APIs.
- Verify the `API ID` is correct; it’s the numeric part after `/external/` in your API URL.
- For POST actions, ensure `POST Body` is valid JSON. Example:

```json
{
  "query": "example",
  "options": { "depth": 2 }
}
```

- If your Zap step returns `errors`, inspect the error message and verify the API configuration in your PulpMiner dashboard.

### License

Copyright (c) PulpMiner. All rights reserved.


