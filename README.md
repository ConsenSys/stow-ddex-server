# Linnia Server

This repository contains a server to query the Linnia Records and search using the Metadata.

Currenlty under construction

## Getting Started

The linnia-server requires a postgres database to connect to. You can either run a server locally, or connect to one that's hosted somewhere else.

### Setup for postgres

1. `$>createuser linnia_user --createdb`
1. `$>createdb linnia_ddex_db -U linnia_user`
1. `$>createdb linnia_ddex-test_db -U linnia_user`

See:https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

### .env setup

To configure the database, ethereum and ipfs connections, you must create a `.env` file in the root of the application and set your environment variables. Here's an example of a sample file:

```
LINNIA_DB_NAME=linnia_ddex_db
LINNIA_DB_USERNAME=linnia_user
LINNIA_ETH_PROVIDER=wss://ropsten.infura.io/ws
LINNIA_IPFS_HOST=ipfs.infura.io
LINNIA_IPFS_PORT=5001
LINNIA_IPFS_PROTOCOL=https
LINNIA_HUB_ADDRESS=0x177bf15e7e703f4980b7ef75a58dc4198f0f1172
LINNIA_DDEX_HUB_ADDRESS=0x32116c7e55b6838ef8afcc89b5b3ce1ca9a135dd
LINNIA_DB_TEST_NAME=linnia_offer_ddex_db
LINNIA_DB_TEST_USERNAME=linnia_user
LINNIA_PORT=3002

```

## To run tests:

Running integration tests requires the use of a test database. The credentials for so much be configured in the `.env` file like so:

```
LINNIA_DB_TEST_NAME=linnia_test_db
LINNIA_DB_TEST_USERNAME=linnia_user
LINNIA_DB_TEST_PASSWORD=securepassword
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
