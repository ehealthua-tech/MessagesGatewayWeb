# Messages Gateway Administration Panel


[![Build Status]()]()
[![code style: prettier]()]()

Demo (dev): 

API: []()

## Installation

### Docker

Dashboard can be deployed as a single container from
[]()
Docker Hub.

## Configurations

Application supports these environment variables:

| Environment Variable  | Default Value                              | Description                                         |
| --------------------- | ------------------------------------------ | --------------------------------------------------- |
| `PORT`                | ``                                         | Node.js server port.                                |
| `API_HOST`            | ``                                         | Ehealth API host.                                   |
| `SITEMAP_HOSTNAME`    | ``                                         | URL will be used in sitemap generated urls          |
| `AUTH_COOKIE_NAME`    | `token`                                    | Name of the cookie, where storing token variable    |
| `CLIENT_ID`           | ``                                         | Front-End client id                                 |
| `CLIENT_SECRET`       | ``                                         | Front-End client secret                             |
| `SCOPES`              | ``                                         | EHEALTH auth scopes                                 |
| `OAUTH_URL`           | ``                                         | Front-End client id                                 |
| `OAUTH_REDIRECT_PATH` | `/auth/redirect`                           | Redirect path for create token in EHEALTH           |

## Technologies

* React
* Redux
* Webpack
* Enzyme
* Jest

### Git flow

Every task should start a new branch. Branch should be named as task number what
its corresponding. After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

* Unit tests for business logic (we use Jest)
* Integration tests for UI components (we use Enzyme)

### PR

Every task finishes with PR. Prettier lint check and tests are blocking PRs. To
simplify PR review, we deploy every PR's branch automatically on Heroku.

## License

See [LICENSE.md](LICENSE.md).