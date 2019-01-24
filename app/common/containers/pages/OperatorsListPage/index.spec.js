import nock from "nock";
import { API_URL } from "../../../config";
import {
  fetchOperators,
  fetchOperatorsTypes,
  fetchOperatorFields,
  fetchProtocols,
  deleteOperator
} from "./redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe("async operators actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it("should dispatch FETCH_OPERATORS when fetchOperators has been done", () => {
    const id = "3a3ded57-9f96-4c93-a471-c27d8182bb9c";

    const body = {
      data: {
        active: true,
        config: { host: "test_host" },
        id: id,
        limit: 1000,
        name: "smtp",
        operator_type_id: "3a3ded57-9f96-4c93-a471-c27d8182bb9c",
        price: 18,
        priority: 1
      }
    };

    nock(`${API_URL}`)
      .get("/operators")
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "operators/FETCH_OPERATORS_REQUEST" },
      {
        type: "operators/FETCH_OPERATORS_SUCCESS",
        payload: body.data,
        meta: undefined
      }
    ];

    return store.dispatch(fetchOperators()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("should dispatch FETCH_OPERATORS_TYPES when fetchOperatorsTypes has been done", () => {
    const body = {
      data: [
        {
          active: true,
          id: "3a3ded57-9f96-4c93-a471-c27d8182bb9c",
          last_update: "2019-01-16T11:35:55.461627",
          name: "smtp_type",
          priority: 1
        }
      ]
    };

    nock(`${API_URL}`)
      .get("/operator_type")
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "operatorsTypes/FETCH_OPERATORS_TYPES_REQUEST" },
      {
        type: "operatorsTypes/FETCH_OPERATORS_TYPES_SUCCESS",
        payload: body.data,
        meta: undefined
      }
    ];

    return store.dispatch(fetchOperatorsTypes()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("should dispatch FETCH_OPERATOR_FIELDS when fetchOperatorsFields has been done", () => {
    const values = {
      operator_type: {
        id: "3a3ded57-9f96-4c93-a471-c27d8182bb9c",
        name: "smtp_type",
        title: "smtp_type"
      },
      protocol: {
        name: "lifecell_sms_protocol",
        title: "lifecell_sms_protocol"
      }
    };

    const body = {
      data: {
        fields: { login: "", password: "" }
      }
    };

    nock(`${API_URL}`)
      .get(`/get_protocol/lifecell_sms_protocol`)
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "operators/FETCH_OPERATOR_FIELDS_REQUEST" },
      {
        type: "operators/FETCH_OPERATOR_FIELDS_SUCCESS",
        payload: body.data,
        meta: undefined
      }
    ];

    return store.dispatch(fetchOperatorFields({ values })).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("should dispatch FETCH_PROTOCOLS when fetchProtocols has been done", () => {
    const body = {
      data: {
        protocols: [
          "smtp_protocol",
          "lifecell_sms_protocol",
          "telegram_protocol",
          "viber_protocol",
          "viber213_protocol",
          "viber215_protocol",
          "lifecell_ip_telephony_protocol"
        ]
      }
    };

    nock(`${API_URL}`)
      .get("/get_protocol")
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "protocols/FETCH_PROTOCOLS_REQUEST" },
      {
        type: "protocols/FETCH_PROTOCOLS_SUCCESS",
        payload: body.data,
        meta: undefined
      }
    ];

    return store.dispatch(fetchProtocols()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("should dispatch DELETE_OPERATOR when deleteOperator has been done", () => {
    const id = "222811e0-145a-4b61-97f8-4f6dfd0ec120";

    const body = {
      data: {
        status: "success"
      }
    };

    nock(`${API_URL}`)
      .delete(`/operators/${id}`)
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "operators/DELETE_OPERATOR_REQUEST" },
      {
        type: "operators/DELETE_OPERATOR_SUCCESS",
        payload: body.data,
        meta: undefined
      },
      {
        type: "toast/SHOW_NOTIFICATION",
        payload: { showing: true, message: "success", type: "success" }
      }
    ];

    return store.dispatch(deleteOperator(id)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
      expect(store.getActions()[2]).toEqual(expectedActions[2]);
    });
  });
});
