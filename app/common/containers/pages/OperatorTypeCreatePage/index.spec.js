import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { apiMiddleware } from 'redux-api-middleware';
import { addOperatorType } from './redux';
import { API_URL } from '../../../config';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('async operatorsTypes actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch ADD_OPERATOR_TYPE when addOperatorType has been done', () => {
    const values = {
      operator_type_name: 'sms',
      priority: 1,
    };

    nock(`${API_URL}`)
      .post('/operator_type')
      .reply(200, {
        data: { status: 'success' },
      });

    const store = mockStore({});

    const expectedActions = [
      { type: 'operatorsTypes/ADD_OPERATOR_TYPE_REQUEST' },
      {
        type: 'operatorsTypes/ADD_OPERATOR_TYPE_SUCCESS',
        payload: { status: 'success' },
      },
    ];

    return store.dispatch(addOperatorType({ values })).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });
});
