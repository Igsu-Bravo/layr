# Counter with Parcel (TS)

A simple example to introduce the core concepts of Liaison.

## Install

Install the npm dependencies with:

```sh
npm install
```

## Usage

### Running the app in development mode

Execute the following command:

```sh
npm run start
```

The app should then be available at http://localhost:1234.

### Debugging

#### Client

Add the following entry in the local storage of your browser:

```
| Key   | Value     |
| ----- | --------- |
| debug | liaison:* |
```

#### Server

Add the following environment variables when starting the app:

```sh
DEBUG=liaison:* DEBUG_DEPTH=10
```