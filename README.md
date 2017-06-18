# Raincatcher TODO Cloud Application

This a simple cloud application that uses Raincatcher modules to Sync and Store TODO Objects.

These objects are synchronised from the Raincatcher TODO Client App.

This application uses the following Raincatcher modules: 

- [raincatcher-sync](https://github.com/feedhenry-raincatcher/raincatcher-sync)
- [raincatcher-workorder](https://github.com/feedhenry-raincatcher/raincatcher-workorder)
- [raincatcher-simple-store](https://github.com/feedhenry-raincatcher/raincatcher-simple-store)

## Setup

This Cloud App Requires [MongoDB](https://docs.mongodb.com/manual/installation/) to run correctly.

In the `Gruntfile.js` file, the `env.local.FH_MONGODB_CONN_URL` is the URL that the raincatcher-sync module will connect to.

To start the application, run:

```bash
npm install
grunt serve:local
```


