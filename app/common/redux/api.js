import { CALL_API } from 'redux-api-middleware';

export const invoke = ({ body, headers, ...config }, { auth = true } = {}) => (dispatch) => {
  const wrappedBody = body && { resource: body };
  return dispatch({
    [CALL_API]: {
      ...config,
      body: JSON.stringify(wrappedBody),
      headers: {
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        // Cookie: req ? req.headers.cookie : undefined, // use cookie from request in SSR mode
        ...headers,
      },
      credentials: auth ? 'same-origin' : 'omit',
    },
  });
};
