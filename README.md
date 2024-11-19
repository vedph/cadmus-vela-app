# Cadmus Vela App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

- [API](https://github.com/vedph/cadmus-vela-api)

## Docker

🐋 Quick Docker image build:

1. `npm run build-lib`.
2. update version in `env.js` and `ng build --configuration=production`.
3. `docker build . -t vedph2020/cadmus-vela-app:4.0.4 -t vedph2020/cadmus-vela-app:latest` (replace with the current version).

You can spare a prod-specific image by just overwriting the [env.js](src/env.js) file in your [Docker compose script](docker-compose.yml) via a volume, e.g.. putting under `cadmus-app`:

```yml
volumes:
  - /opt/cadmus/env.js:/usr/share/nginx/html/env.js
```

where `/opt/cadmus/env.js` is the path to the modified `env.js` file in your host machine, and the portion of the value after colon is the path to `env.js` inside the container. In `env.js` you must ensure that `apiUrl` points to the correct API location, which in the default file is just `localhost` with a specific non-standard port.

## History

- 2024-11-19: updated Angular and packages.

### 5.0.0

- 2024-11-09: updated Angular and packages.
- 2024-11-03: ⚠️ refactored item configuration. Now all the grf- parts under projects are no longer needed, as everything derives from a shared set of epigraphy components.
- 2024-10-29: updated packages.
- 2024-10-28: updated Angular.

### 4.0.4

- 2024-10-21: updated Angular and packages.
- 2024-10-10: updated Angular and packages.
- 2024-09-12: updated Angular and packages.
- 2024-07-19:
  - updated Angular and packages.
  - [refactored Gravatar](https://myrmex.github.io/overview/cadmus/dev/history/f-gravatar/).
- 2024-06-09:
  - updated Angular and packages.
  - added `class="mat-X"` for each `color="X"` (e.g. `class="mat-primary"` wherever there is a `color="primary"`) to allow transitioning to Angular Material M3 from M2. This also implies adding it directly to the target element, so in the case of `mat-icon` inside a `button` with `color` the class is added to `mat-icon` directly (unless the button too has the same color). This allows to keep the old M2 clients while using the new M3, because it seems that the compatibility mixin is not effective in some cases like inheritance of `color`, and in the future `color` will be replaced by `class` altogether.
  - applied [M3 theme](https://material.angular.io/guide/theming).
  - added missing `preview-styles.css`.
- 2024-05-24: ⚠️ upgraded to Angular 18.

### 4.0.3

- 2024-05-19: updated Angular and packages.
- 2024-05-15:
  - updated Angular and packages.
  - added text editor plugins.

### 4.0.0

- 2024-04-14: ⚠️ upgraded to [bricks V2](https://github.com/vedph/cadmus-bricks-shell-v2).
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
