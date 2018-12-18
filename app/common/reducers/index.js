import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { routerReducer as routing } from "react-router-redux";
import labels from "../redux/labels";
import Aside from "../containers/blocks/Aside/redux";
import session from "../redux/session";
import loading from "../redux/loading";
import configuration from "../containers/pages/ConfigurationFormPage/redux";
import priority from "../containers/pages/PriorityPage/redux";


const blocks = combineReducers({
  Aside
});

const data = combineReducers({
  labels,
  configuration,
  priority
});

export default combineReducers({
  blocks,
  session,
  data,
  // external libraries
  form,
  routing,
  loading
});

export const isAuthorized = state => state.session.authorized;
export const getScope = state => state.session.scope;
export const getForm = (state, formName) => state.form[formName] || {};
export const getConfiguration = state => state.data.configuration;
export const getPriority = state => state.data.priority.priority;
export const getPriorityFormFields = (state) => {
  return Object.assign({}, ...getPriority(state).map((operator) => {
    return {
      [operator.name]: operator.active
    };
  }));
};






