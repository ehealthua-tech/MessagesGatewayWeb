import { createAction, handleActions } from 'redux-actions';
import { AUTH_COOKIE_NAME, API_URL } from 'config';
import { invoke } from './api';
import { HOST } from '../config';

export const getToken = () => (dispatch, getState, { req }) => req.cookies[AUTH_COOKIE_NAME];

export const verifyToken = (token) => {
  return invoke({
    endpoint: `${HOST}/admin/tokens/${token}/verify`,
    method: 'GET',
    types: [
      'session/VERIFY_TOKEN_REQUEST',
      {
        type: 'session/VERIFY_TOKEN_SUCCESS',
        payload: (action, state, res) =>
          res.json().then(({ data: { details: { scope } } }) => ({
            authorized: true,
            scope,
          })),
      },
      'session/VERIFY_TOKEN_FAILURE',
    ],
  });
};

export const logout = () =>
  invoke({
    endpoint: '/logout',
    method: 'DELETE',
    types: ['session/LOGOUT_REQUEST', 'session/LOGOUT_SUCCESS', 'session/LOGOUT_FAILURE'],
  });

export default handleActions(
  {
    'session/VERIFY_TOKEN_SUCCESS': (state, action) => ({
      ...state,
      ...action.payload,
    }),
    'session/LOGOUT_SUCCESS': () => ({}),
  },
  {}
);
