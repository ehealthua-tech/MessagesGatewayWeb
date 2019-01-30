import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import Aside from '../containers/blocks/Aside/redux';
import session from '../redux/session';
import notification from '../redux/notification';
import configurationData from '../containers/pages/ConfigurationFormPage/redux';
import operatorsData from '../containers/pages/OperatorsListPage/redux';
import operatorData from '../containers/pages/OperatorDetailPage/redux';
import operatorsTypesData from '../containers/pages/OperatorsTypesListPage/redux';

const blocks = combineReducers({
  Aside,
});

const data = combineReducers({
  configurationData,
  operatorsTypesData,
  operatorsData,
  operatorData,
});

export default combineReducers({
  blocks,
  session,
  data,
  // external libraries
  form,
  routing,
  notification,
});

export const isAuthorized = state => state.session.authorized;
export const getForm = (state, formName) => state.form[formName] || {};
export const getScope = state => state.session.scope;
export const getConfiguration = state => state.data.configurationData.configuration;
export const getOperators = state => state.data.operatorsData.operators;
export const getProtocols = state => state.data.operatorsData.protocols;
export const getOperatorsTypes = state => state.data.operatorsTypesData.operatorsTypes;
export const getOperatorsFormFields = state =>
  Object.assign(
    {},
    ...getOperatorsTypes(state).map((operator) => {
      const { name, active } = operator;
      return {
        [name]: active,
      };
    })
  );

export const getOperatorsDetailFormFields = state => state.data.operatorData.operatorDetails;
