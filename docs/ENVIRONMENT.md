Environment Variables

This environment variables can be used to configure released docker container at
start time. Also sample .env can be used as payload for docker run cli.

| Environment Variable  | Default Value                      | Description                                      |
| --------------------- | ---------------------------------- | ------------------------------------------------ |
| `PORT`                | `8080`                             | Node.js server port.                             |
| `HOST`                | `http://localhost:8080`            | Ehealth API host.                                |
| `API_PROXY_PATH`      | `/api`                             | Proxy path.                                      |
| `AUTH_COOKIE_NAME`    | `authorization`                    | Authentication cookie name                       |
| `SITEMAP_HOSTNAME`    | `http://localhost:8080`            | URL will be used in sitemap generated urls       |
| `AUTH_COOKIE_NAME`    | `token`                            | Name of the cookie, where storing token variable |
| `CLIENT_ID`           | `test`                             | Front-End client id                              |
| `CLIENT_SECRET`       | `test`                             | Front-End client secret                          |
| `SCOPES`              | `messages_gateway_configure:write` | EHEALTH auth scopes                              |
| `OAUTH_URL`           | `http://localhost/sign-in`         | Front-End client id                              |
| `PUBLIC_INDEX_ROUTE`  | `/auth`                            | Redirect to sign-in page                         |
| `PRIVATE_INDEX_ROUTE` | `/dashboard`                       | Redirect to dashboard                            |
| `OAUTH_REDIRECT_PATH` | `/auth/redirect`                   | Redirect path for create token in EHEALTH        |
