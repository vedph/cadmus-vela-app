# Cadmus Vela App

- [Cadmus Vela App](#cadmus-vela-app)
  - [Docker](#docker)
  - [History](#history)
    - [3.0.0](#300)
    - [2.0.0](#200)
    - [1.0.0](#100)
    - [0.0.5](#005)
    - [0.0.4](#004)
    - [0.0.3](#003)
    - [0.0.2](#002)
    - [0.0.1](#001)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

- [API](https://github.com/vedph/cadmus-vela-api)

## Docker

🐋 Quick Docker image build:

1. `npm run build-lib`.
2. update version in `env.js` and `ng build --configuration=production`.
3. `docker build . -t vedph2020/cadmus-vela-app:3.0.0 -t vedph2020/cadmus-vela-app:latest` (replace with the current version).

You can spare a prod-specific image by just overwriting the [env.js](src/env.js) file in your [Docker compose script](docker-compose.yml) via a volume, e.g.. putting under `cadmus-app`:

```yml
volumes:
  - /opt/cadmus/env.js:/usr/share/nginx/html/env.js
```

where `/opt/cadmus/env.js` is the path to the modified `env.js` file in your host machine, and the portion of the value after colon is the path to `env.js` inside the container. In `env.js` you must ensure that `apiUrl` points to the correct API location, which in the default file is just `localhost` with a specific non-standard port.

## History

- 2024-03-23:
  - ⚠️ updated packages removing `rangy` and replacing MapboxGL with Leaflet.
  - updated Angular.
- 2024-01-30:
  - added `prevalentCasing` and `glottologCodes` to `GrfWritingPart`.
  - added `damnatio` to `GrfLocalizationPart`.
- 2024-01-26:
  - `GrfWritingPart.Scripts` multiple instead of `Script` (`@myrmidon/cadmus-part-graffiti-localization`).
  - `GrfLocalizationPart.Period` added (`@myrmidon/cadmus-part-graffiti-writing`).
- 2024-01-19: updated Angular and packages.
- 2024-01-04: updated Angular and packages.

### 3.0.0

- 2023-11-11:
  - ⚠️ upgraded to Angular 17.
  - opted in flags editor.
  - opted in thesauri import.

### 2.0.0

- 2023-06-28:
  - updated Angular and packages.
  - moved to PostgreSQL.

### 1.0.0

- 2023-04-03: better styling.
- 2023-04-02: completed parts refactoring.
- 2023-03-24: various fixes.
- 2023-03-23:
  - updated Angular.
  - fixed port number.

### 0.0.5

- 2023-03-11: updated packages.
- 2023-03-07: updated Angular and packages.
- 2023-03-02: updated Angular and packages.

### 0.0.4

- 2023-02-11: updated packages.

### 0.0.3

- 2023-02-09: updated Angular and packages.

### 0.0.2

- 2023-02-07: updated Angular and packages.

### 0.0.1

- 2023-01-17: updated packages.
