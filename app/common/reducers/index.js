import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { routerReducer as routing } from "react-router-redux";
import labels from "../redux/labels";
import Aside from "../containers/blocks/Aside/redux";
import session from "../redux/session";
import loading from "../redux/loading";
import notification from "../redux/notification";
import configuration from "../containers/pages/ConfigurationFormPage/redux";
import operatorsData from "../containers/pages/OperatorsListPage/redux";
import operatorsTypesData from "../containers/pages/OperatorsTypesListPage/redux";


const blocks = combineReducers({
  Aside
});

const data = combineReducers({
  labels,
  configuration,
  operatorsTypesData,
  operatorsData
});

export default combineReducers({
  blocks,
  session,
  data,
  // external libraries
  form,
  routing,
  loading,
  notification
});

export const isAuthorized = state => state.session.authorized;
export const getScope = state => state.session.scope;
export const getForm = (state, formName) => state.form[formName] || {};
export const getConfiguration = state => state.data.configuration;
export const getOperators = state => state.data.operatorsData.operators;
export const getOperatorsTypes = state => state.data.operatorsTypesData.operatorsTypes;
export const getOperatorsFormFields = (state) => {
  return Object.assign({}, ...getOperatorsTypes(state).map((operator) => {
    const { name, active } = operator;
    return {
      [name]: active
    };
  }));
};
// export const getOperatorsTypes = state => state.data.priority.operatorsTypesList;







