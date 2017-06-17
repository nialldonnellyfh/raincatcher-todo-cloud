# Raincatcher TODO Cloud Application

This a simple cloud application that uses Raincatcher modules to Sync and Store TODO Objects.

These objects are synchronised from the Raincatcher TODO Client App.

## Setup

This Cloud App Requires [MongoDB](https://docs.mongodb.com/manual/installation/) run.

In the `Gruntfile.js` file, the `env.local.FH_MONGODB_CONN_URL` is the URL that the raincatcher-sync module will connect to.

To start the application, run:

```bash
npm install
grunt serve:local
```


