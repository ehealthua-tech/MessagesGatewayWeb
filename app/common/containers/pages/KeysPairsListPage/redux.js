import { combineReducers } from 'redux';
import { createAction, handleAction } from 'redux-actions';
import * as KeysPairsAPI from '../../../redux/keys-pairs';
import * as Notifications from '../../../redux/notification';

export const showKeysPairs = createAction('keys/SHOW_KEYS_PAIRS_DETAILS');

/**
 * Receives keysPairs from server
 * @returns {function}
 */

export const fetchAllKeysPairs = () => dispatch =>
  dispatch(KeysPairsAPI.fetchAllKeysPairs()).then((action) => {
    if (action.error) throw action;

    return dispatch(showKeysPairs(action.payload));
  });

/**
 * Generate new keysPairs
 * @returns {function}
 */

export const generateKeyPair = () => dispatch =>
  dispatch(KeysPairsAPI.generateKeyPairDetail()).then((action) => {
    if (action.error) throw action;

    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.message,
            type: 'warning',
          })
        )
      : dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.status,
            type: 'success',
          })
        );
    /**
     * Receives keysPairs from server
     * @returns {function}
     */

    return dispatch(KeysPairsAPI.fetchAllKeysPairs()).then((action) => {
      if (action.error) throw action;

      return dispatch(showKeysPairs(action.payload));
    });
  });

/**
 * Activating  keysPair
 * @param {Object} body
 * @returns {function}
 */

export const activateKeyPair = body => (dispatch) => {
  return dispatch(KeysPairsAPI.activateKeyPairDetail(body)).then((action) => {
    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.message,
            type: 'warning',
          })
        )
      : dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.status,
            type: 'success',
          })
        );

    /**
     * Receives keysPairs from server
     * @returns {function}
     */

    return dispatch(KeysPairsAPI.fetchAllKeysPairs()).then((action) => {
      if (action.error) throw action;

      return dispatch(showKeysPairs(action.payload));
    });
  });
};

/**
 * Deactivating keysPair
 * @param {Object} body
 * @returns {function}
 */

export const deactivateKeyPair = body => (dispatch) => {
  return dispatch(KeysPairsAPI.deactivateKeyPairDetail(body)).then((action) => {
    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.message,
            type: 'warning',
          })
        )
      : dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.status,
            type: 'success',
          })
        );

    /**
     * Receives keysPairs from server
     * @returns {function}
     */

    return dispatch(KeysPairsAPI.fetchAllKeysPairs()).then((action) => {
      if (action.error) throw action;

      return dispatch(showKeysPairs(action.payload));
    });
  });
};

/**
 * Delete keysPair from server
 * @param {string} id
 * @returns {function}
 */

export const deleteKeyPair = id => dispatch =>
  dispatch(KeysPairsAPI.deleteKeyPairDetail(id)).then((action) => {
    action.error
      ? dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.message,
            type: 'warning',
          })
        )
      : dispatch(
          Notifications.showNotification({
            showing: true,
            message: action.payload.status,
            type: 'success',
          })
        );

    /**
     * Receives keysPairs from server
     * @returns {function}
     */

    return dispatch(KeysPairsAPI.fetchAllKeysPairs()).then((action) => {
      if (action.error) throw action;

      return dispatch(showKeysPairs(action.payload));
    });
  });

const keysPairs = handleAction(showKeysPairs, (state, action) => action.payload, []);

export default combineReducers({
  keysPairs,
});
