# A simple todo app

## Prerequisites

- [Node.js > 16](https://nodejs.org) and npm
- [reactjs > 17](https://reactjs.org/)
- [PostgreSQL > 14](https://postgresql.org)
- [Docker ](https://www.docker.com/)

## API

First you need to setup `database` in a docker container. For that move to `server` directory and from `.env.sample` file create a `.env` file.

After that run the following command for creating dockerized container:

```console
docker compose up
```

Above command will create a docker container for postgres database and node server.

In the same directory run the following command:

```console
./scripts/run.sh
```

It will run the `todo api` on the port number provided in the `.env` file.

## UI

First create a `.env` file from `.env.sample` file. This file containes address where `todo api` is hosted.

After that run the following command:

```console
./scripts/run.sh
```

The above command will run the UI on the follwing address `http://localhost:3000`.
