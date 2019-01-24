import nock from "nock";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { apiMiddleware } from "redux-api-middleware";
import { fetchOperator, updateOperator } from "./redux";
import { API_URL } from "../../../config";

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe("async operators actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should dispatch FETCH_OPERATOR_DETAIL when fetchOperatorDetail has been done", () => {
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
      .get(`/operators/${id}`)
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "operators/FETCH_OPERATOR_DETAILS_REQUEST" },
      {
        type: "operators/FETCH_OPERATOR_DETAILS_SUCCESS",
        payload: body.data,
        meta: undefined
      }
    ];

    return store.dispatch(fetchOperator(id)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("should dispatch UPDATE_OPERATOR when updateOperatorDetail has been done", () => {
    const operator = {
      active: true,
      config: { host: "test_host" },
      host: "test_host",
      id: "222811e0-145a-4b61-97f8-4f6dfd0ec120",
      limit: 1000,
      name: "smtp",
      operator_type_id: "3a3ded57-9f96-4c93-a471-c27d8182bb9c",
      price: 18,
      priority: 1
    };

    nock(`${API_URL}`)
      .post("/operators/change")
      .reply(200, {
        data: { status: "success" }
      });

    const store = mockStore({});

    const expectedActions = [
      { type: "operators/UPDATE_OPERATOR_REQUEST" },
      {
        type: "operators/UPDATE_OPERATOR_SUCCESS",
        payload: { status: "success" }
      },
      {
        type: "toast/SHOW_NOTIFICATION",
        payload: { showing: true, message: "success", type: "success" }
      }
    ];

    return store.dispatch(updateOperator({ operator })).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
      expect(store.getActions()[2]).toEqual(expectedActions[2]);
    });
  });
});
