let config = {};

if (__CLIENT__ && window && window.__CONFIG__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {}
}

export const PORT = config.PORT || process.env.PORT || 8080;
export const HOSTNAME =
  typeof window !== "undefined"
    ? window.location.origin
    : config.HOSTNAME || "http://localhost:8080";
export const HOST = process.env.HOST || "http://192.168.12.249:4011";
export const API_HOST = `${HOST}/api`;

export const SITEMAP_HOSTNAME =
  process.env.SITEMAP_HOSTNAME || "http://localhost:8080"; // used in sitemap

export const LANG_COOKIE_NAME = "lang";
export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "authorization";

export const API_PROXY_PATH = "/api";

export const PUBLIC_INDEX_ROUTE = "/auth";
export const PRIVATE_INDEX_ROUTE = "/dashboard";

export const CLIENT_ID =
  config.CLIENT_ID ||
  process.env.CLIENT_ID ||
  "a50c9298-badd-47db-a6bd-7850ef8727fe";
export const SCOPES = config.SCOPES || process.env.SCOPES || "";
export const OAUTH_URL =
  config.OAUTH_URL ||
  process.env.OAUTH_URL ||
  `http://192.168.100.165:3000/sign-in`;
export const OAUTH_REDIRECT_PATH =
  config.OAUTH_REDIRECT_PATH ||
  process.env.OAUTH_REDIRECT_PATH ||
  "/auth/redirect";
export const OAUTH_REDIRECT_URL =
  config.OAUTH_REDIRECT_URL ||
  process.env.OAUTH_REDIRECT_URL ||
  `${HOST}${OAUTH_REDIRECT_PATH}`;

// for internal app usage. for example for XHR requests or server side rendering
export const API_URL =
  typeof window !== "undefined" && process.env.NODE_ENV !== "test"
    ? API_PROXY_PATH
    : API_HOST;
