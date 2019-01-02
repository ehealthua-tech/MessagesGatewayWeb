let config = {};

if (__CLIENT__ && window && window.__CONFIG__) {
  try {
    config = JSON.parse(unescape(window.__CONFIG__));
  } catch (e) {}
}

export const PORT =  8080;
export const HOSTNAME =
  typeof window !== "undefined"
    ? window.location.origin
    : config.HOSTNAME || "http://localhost:8080";
export const API_HOST =  "http://192.168.100.165:4011";

export const MOCK_API_HOST = "";

export const SITEMAP_HOSTNAME =  "http://localhost:8080"; // used in sitemap
export const LANG_COOKIE_NAME = "lang";
export const AUTH_COOKIE_NAME =  "authorization";

export const API_PROXY_PATH = "/api";
export const API_INTERNAL_PROXY = "/api-internal"; // For internal usage.
export const MOCK_API_PROXY_PATH = "/mock-api";

export const PUBLIC_INDEX_ROUTE = "/sign-in";
export const PRIVATE_INDEX_ROUTE = "/dashboard";

export const CLIENT_ID = "a50c9298-badd-47db-a6bd-7850ef8727fe";
export const SCOPES = config.SCOPES || process.env.SCOPES || "";
export const OAUTH_URL = `${API_HOST}`;
export const SIGN_URL =  `${API_HOST}/sign`;
export const OAUTH_REDIRECT_PATH = "/auth/redirect";
export const OAUTH_REDIRECT_URL = `${HOSTNAME}${OAUTH_REDIRECT_PATH}`;

// for internal app usage. for example for XHR requests or server side rendering
export const API_URL =
  typeof window !== "undefined" ? API_PROXY_PATH : API_HOST;
export const MOCK_API_URL =
  typeof window !== "undefined" ? MOCK_API_PROXY_PATH : MOCK_API_HOST;
