import { handleAction, combineActions } from "redux-actions";
import { API_URL } from "../config";
import { createUrl } from "helpers/url";
import { invoke } from "./api";

export const fetchOperators = options =>
  invoke({
    endpoint: createUrl(`${API_URL}/operators`, options),
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "operators/FETCH_OPERATORS_REQUEST",
      {
        type: "operators/FETCH_OPERATORS_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "operators/FETCH_OPERATORS_FAILURE"
    ]
  });

export const fetchOperatorDetail = id =>
  invoke({
    endpoint: `${API_URL}/operators/${id}`,
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "operators/FETCH_OPERATOR_DETAILS_REQUEST",
      {
        type: "operators/FETCH_OPERATOR_DETAILS_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "operators/FETCH_OPERATOR_DETAILS_FAILURE"
    ]
  });

export const fetchOperatorFieldsDetail = name =>
  invoke({
    endpoint: `${API_URL}/get_protocol/${name}`,
    method: "GET",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "operators/FETCH_OPERATOR_FIELDS_REQUEST",
      {
        type: "operators/FETCH_OPERATOR_FIELDS_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "operators/FETCH_OPERATOR_FIELDS_FAILURE"
    ]
  });

export const updateOperatorDetail = body =>
  invoke({
    endpoint: `${API_URL}/operators/change`,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "operators/UPDATE_OPERATOR_REQUEST",
      {
        type: "operators/UPDATE_OPERATOR_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "operators/UPDATE_OPERATOR_FAILURE"
    ],
    body
  });

export const addOperatorDetail = body =>
  invoke({
    endpoint: `${API_URL}/operators`,
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "operators/ADD_OPERATOR_REQUEST",
      {
        type: "operators/ADD_OPERATOR_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "operators/ADD_OPERATOR_FAILURE"
    ],
    body
  });

export const deleteOperatorDetail = id =>
  invoke({
    endpoint: `${API_URL}/operators/${id}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json"
    },
    types: [
      "operators/DELETE_OPERATOR_REQUEST",
      {
        type: "operators/DELETE_OPERATOR_SUCCESS",
        payload: (action, state, res) => res.json().then(resp => resp.data)
      },
      "operators/DELETE_OPERATOR_FAILURE"
    ]
  });

export default handleAction(
  combineActions("operators/FETCH_PRIORITY_SUCCESS"),
  (state, action) => ({
    ...state,
    ...action.payload
  }),
  []
);
