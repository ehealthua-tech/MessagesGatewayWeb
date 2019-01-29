import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from '../config';
import { createUrl } from 'helpers/url';
import { invoke } from './api';

export const fetchProtocols = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/get_protocol`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'protocols/FETCH_PROTOCOLS_REQUEST',
      {
        type: 'protocols/FETCH_PROTOCOLS_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'protocols/FETCH_PROTOCOLS_FAILURE',
    ],
  });

export default handleAction(
  combineActions('operators/FETCH_PROTOCOLS_SUCCESS'),
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  []
);
