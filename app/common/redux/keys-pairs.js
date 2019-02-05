import { handleAction, combineActions } from 'redux-actions';
import { createUrl } from 'helpers/url';
import { API_URL } from '../config';
import { invoke } from './api';

export const fetchAllKeysPairs = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/keys/all`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'keys/FETCH_ALL_KEYS_PAIRS_REQUEST',
      {
        type: 'keys/FETCH_ALL_KEYS_PAIRS_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'keys/FETCH_ALL_KEYS_PAIRS_FAILURE',
    ],
  });

export const generateKeyPairDetail = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/keys`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'keys/GENERATE_KEY_PAIR_REQUEST',
      {
        type: 'keys/GENERATE_KEY_PAIR_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'keys/GENERATE_KEY_PAIR_FAILURE',
    ],
  });

export const activateKeyPairDetail = body =>
  invoke({
    endpoint: `${API_URL}/keys/activate`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'keys/ACTIVATE_KEY_PAIR_REQUEST',
      {
        type: 'keys/ACTIVATE_KEY_PAIR_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'keys/ACTIVATE_KEY_PAIR_FAILURE',
    ],
    body,
  });

export const deactivateKeyPairDetail = body =>
  invoke({
    endpoint: `${API_URL}/keys/deactivate`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'keys/DEACTIVATE_KEY_PAIR_REQUEST',
      {
        type: 'keys/DEACTIVATE_KEY_PAIR_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'keys/DEACTIVATE_KEY_PAIR_FAILURE',
    ],
    body,
  });

export const deleteKeyPairDetail = id =>
  invoke({
    endpoint: `${API_URL}/keys/${id}`,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'keys/DELETE_KEY_PAIR_REQUEST',
      {
        type: 'keys/DELETE_KEY_PAIR_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'keys/DELETE_KEY_PAIR_FAILURE',
    ],
  });

export default handleAction(
  combineActions('keys/FETCH_KEYS_PAIRS_SUCCESS'),
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  []
);
