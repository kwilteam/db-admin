# Kwil DB Admin

## Setup Kwil DB Admin

To get started copy the .env.example file to .env and fill in the email server details. These are required for email login.

The first time the Kwil Admin DB server is started, you need to setup the initial admin user for the Admin UI.
The initial account can be a Wallet or an Email account.

Once this has been created the Admin user will be able to import or create a new mnemonic for the Admin DB UI. This approach offers the following benefits:

- It enables transactions to be signed automatically on the server by the Admin DB UI.
- It enables email accounts to be used without the need for a wallet.

After the setup is completed the user will be redirected to the dashboard page.

## Development Setup

To start the development server, first add the environment variables to a `.env.local` file. Then run the following commands:

```bash
yarn install
yarn dev
```

## Testing the Kwil DB Admin

Integration Tests are written using Playwright and can be run by following these steps:

1. Make sure the kwild service is running (by default this should be accessible on localhost:8080)
2. Copy the directory `tests/.kwil-admin-ui.example` to `tests/.kwil-admin-ui`.
   _The reason for this is so we have the initial admin user setup for the tests._
3. Start the test server: `yarn test-server` which will run the Kwil Admin UI on port 4444 (by default).
4. Run the tests: `yarn test`

The following core features are covered:

- Login by email

### Schema Tests

- Create and save new schema file
- Deploy Schema to Kwil Provider
- Delete schema file

### DB Tests

- Read empty database table
- Execute DB schema action
- Validate correct data in database table
- Delete DB

### Account Tests

- Create new wallet Account
- Delete new wallet Account

## Extensions

The extensions are loaded from a JSON file `/utils/kwil/extensions.json` and the UI searches and filters based on the extension information stored in this file.

I had considered creating an extensions schema and deploying it on the Public Kwil Provider and then accessing this schema from the Admin UI. However, at this time it wouldn't be possible as the Admin UI is working with the new pre-release version of the Kwil DB and the Public Kwil Provider is still running the old version.

## Possible Improvements

As mentioned, transaction signing is currently occurring on the server and all operations are signed by the same Admin DB account irrespective of the user logged in. This does offer some benefits, especially for private networks, but it also has some drawbacks. It may be preferred to move signing onto the client in the future and to do this wouldn't be too difficult.

If this was preferred then the following changes would need to be considered:

1. Setup stage would likely not be needed
2. Email accounts would not be supported unless a service like Magic was used
3. If the Kwil Provider was a private network, we would need to be able to limit which accounts could deploy databases. Does the new blockchain version of Kwil have the capacity to limit which address can deploy DB's to specific networks?
4. If 3 is possible then the accounts UI could be updated to manage which accounts are given deploy access to the Provider
