# Stow DDEX Server

This repository contains a server to query the Stow DDEX Offers and search using the seller.

Currenlty under construction

## Getting Started

The stow-ddex-server requires a postgres database to connect to. You can either run a server locally, or connect to one that's hosted somewhere else.

### Setup for postgres

1. `$>createuser stow_user --createdb`
1. `$>createdb stow_ddex_db -U stow_user`
1. `$>createdb stow_ddex_test_db -U stow_user`

See:https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

### .env setup

To configure the database, ethereum and ipfs connections, you must create a `.env` file in the root of the application and set your environment variables. Here's an example of a sample file:

```
STOW_DB_NAME=stow_ddex_db
STOW_DB_USERNAME=stow_user
STOW_ETH_PROVIDER=wss://ropsten.infura.io/ws
STOW_DDEX_HUB_ADDRESS=0x32116c7e55b6838ef8afcc89b5b3ce1ca9a135dd
STOW_DB_TEST_NAME=stow_ddex_test_db
STOW_DB_TEST_USERNAME=stow_user
STOW_PORT=3002

```

## To run tests:

Running integration tests requires the use of a test database. The credentials for so much be configured in the `.env` file like so:

```
STOW_DB_TEST_NAME=stow_ddex_test_db
STOW_DB_TEST_USERNAME=stow_user
STOW_DB_TEST_PASSWORD=securepassword
```

You can use the same database as normal, but **be warned, you will lose all of the current data in your database if you run the tests.**

To run the tests, first run the server in test mode like so:

```bash
npm run test-server
```

Then, in a separate terminal window, run the tests like so:

```bash
npm run test
```

## End Points

### [GET] /offers/${seller}

Returns all offers that the current user has



## Run Server

```
npm install
npm start
```
