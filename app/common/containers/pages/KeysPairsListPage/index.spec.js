import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { API_URL } from '../../../config';
import {
  activateKeyPair,
  deactivateKeyPair,
  deleteKeyPair,
  fetchAllKeysPairs,
  generateKeyPair,
} from './redux';

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe('async keysPairs actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should dispatch ACTIVATE_KEY_PAIR when activateKeyPair has been done', () => {
    const id = { id: 'vdvj56ue2ol0i8g=' };

    const body = {
      data: {
        keys: [
          {
            id: 'vdvj56ue2ol0i8g=',
            key: '2luvugfrfsb6pjgm58000282',
            active: true,
          },
          {
            id: 'onpd027i25qgn0g=',
            key: '2luvu7u5ub1hvsghek0002r2',
            active: false,
          },
        ],
      },
    };

    nock(`${API_URL}`)
      .post('/keys/activate')
      .reply(200, {
        data: { status: 'success' },
      })
      .get('/keys/all')
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: 'keys/ACTIVATE_KEY_PAIR_REQUEST' },
      {
        type: 'keys/ACTIVATE_KEY_PAIR_SUCCESS',
        payload: { status: 'success' },
      },
    ];

    return store.dispatch(activateKeyPair(id)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it('should dispatch DEACTIVATE_KEY_PAIR when deactivateKeyPair has been done', () => {
    const id = { id: 'vdvj56ue2ol0i8g=' };

    const body = {
      data: {
        keys: [
          {
            id: 'vdvj56ue2ol0i8g=',
            key: '2luvugfrfsb6pjgm58000282',
            active: false,
          },
          {
            id: 'onpd027i25qgn0g=',
            key: '2luvu7u5ub1hvsghek0002r2',
            active: false,
          },
        ],
      },
    };

    nock(`${API_URL}`)
      .post('/keys/deactivate')
      .reply(200, {
        data: { status: 'success' },
      })
      .get('/keys/all')
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: 'keys/DEACTIVATE_KEY_PAIR_REQUEST' },
      {
        type: 'keys/DEACTIVATE_KEY_PAIR_SUCCESS',
        payload: { status: 'success' },
      },
    ];

    return store.dispatch(deactivateKeyPair(id)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it('should dispatch GENERATE_KEY_PAIR when generateKeyPair has been done', () => {
    const body = {
      data: {
        keys: [
          {
            id: 'vdvj56ue2ol0i8g=',
            key: '2luvugfrfsb6pjgm58000282',
            active: true,
          },
          {
            id: 'onpd027i25qgn0g=',
            key: '2luvu7u5ub1hvsghek0002r2',
            active: false,
          },
          {
            active: true,
            id: 'miuqaskva9oh9o8=',
            key: '2lvj8fdknlp777qie4000561',
          },
        ],
      },
    };

    nock(`${API_URL}`)
      .get('/keys')
      .reply(200, {
        data: {
          status: 'success',
        },
      })
      .get('/keys/all')
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: 'keys/GENERATE_KEY_PAIR_REQUEST' },
      {
        type: 'keys/GENERATE_KEY_PAIR_SUCCESS',
        payload: { status: 'success' },
      },
    ];

    return store.dispatch(generateKeyPair()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it('should dispatch DELETE_KEY_PAIR when deleteKeyPair has been done', () => {
    const id = 'vdvj56ue2ol0i8g=';

    const body = {
      data: {
        keys: [
          {
            id: 'vdvj56ue2ol0i8g=',
            key: '2luvugfrfsb6pjgm58000282',
            active: true,
          },
          {
            id: 'onpd027i25qgn0g=',
            key: '2luvu7u5ub1hvsghek0002r2',
            active: false,
          },
        ],
      },
    };

    nock(`${API_URL}`)
      .delete(`/keys/${id}`)
      .reply(200, {
        data: { status: 'success' },
      })
      .get('/keys/all')
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: 'keys/DELETE_KEY_PAIR_REQUEST' },
      {
        type: 'keys/DELETE_KEY_PAIR_SUCCESS',
        payload: { status: 'success' },
      },
    ];

    return store.dispatch(deleteKeyPair(id)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it('should dispatch FETCH_ALL_KEYS_PAIRS when fetchAllKeysPairs has been done', () => {
    const body = {
      data: {
        keys: [
          {
            id: 'vdvj56ue2ol0i8g=',
            key: '2luvugfrfsb6pjgm58000282',
            active: true,
          },
          {
            id: 'onpd027i25qgn0g=',
            key: '2luvu7u5ub1hvsghek0002r2',
            active: false,
          },
        ],
      },
    };

    nock(`${API_URL}`)
      .get('/keys/all')
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: 'keys/FETCH_ALL_KEYS_PAIRS_REQUEST' },
      {
        type: 'keys/FETCH_ALL_KEYS_PAIRS_SUCCESS',
        payload: body.data,
        meta: undefined,
      },
    ];

    return store.dispatch(fetchAllKeysPairs()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });
});
