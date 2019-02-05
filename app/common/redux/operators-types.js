import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { createUrl } from 'helpers/url';
import { invoke } from './api';

export const fetchOperatorsTypes = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/operator_type`, options),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'operatorsTypes/FETCH_OPERATORS_TYPES_REQUEST',
      {
        type: 'operatorsTypes/FETCH_OPERATORS_TYPES_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'operatorsTypes/FETCH_OPERATORS_TYPES_FAILURE',
    ],
  });

export const addOperatorTypeDetail = body =>
  invoke({
    endpoint: `${API_URL}/operator_type`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'operatorsTypes/ADD_OPERATOR_TYPE_REQUEST',
      {
        type: 'operatorsTypes/ADD_OPERATOR_TYPE_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'operatorsTypes/ADD_OPERATOR_TYPE_FAILURE',
    ],
    body,
  });

export const deleteOperatorTypeDetail = id =>
  invoke({
    endpoint: `${API_URL}/operator_type/${id}`,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'operatorsTypes/DELETE_OPERATOR_TYPE_REQUEST',
      {
        type: 'operatorsTypes/DELETE_OPERATOR_TYPE_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'operatorsTypes/DELETE_OPERATOR_TYPE_FAILURE',
    ],
  });

export const updateOperatorsTypes = body =>
  invoke({
    endpoint: `${API_URL}/operator_type/update_priority`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    types: [
      'operatorsTypes/UPDATE_OPERATORS_TYPES_PRIORITY_REQUEST',
      {
        type: 'operatorsTypes/UPDATE_OPERATORS_TYPES_PRIORITY_SUCCESS',
        payload: (action, state, res) => res.json().then(resp => resp.data),
      },
      'operatorsTypes/UPDATE_OPERATORS_TYPES_PRIORITY_FAILURE',
    ],
    body,
  });

export default handleAction(
  combineActions('dictionaries/FETCH_PRIORITY_SUCCESS', 'dictionaries/UPDATE_PRIORITY_SUCCESS'),
  (state, action) => ({
    ...state,
    ...action.payload,
  }),
  []
);
