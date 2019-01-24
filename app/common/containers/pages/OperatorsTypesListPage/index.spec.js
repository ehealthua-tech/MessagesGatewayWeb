import nock from "nock";
import { API_URL } from "../../../config";
import {
  fetchOperatorsTypes,
  deleteOperatorType,
  showChangedOperatorsTypes,
  combineOperatorsTypes
} from "./redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe("async operatorsTypes actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should dispatch UPDATE_OPERATORS_PRIORITY when updateOperatorsTypes has been done", () => {
    const operatorsTypes = [
      {
        active: true,
        id: "eaacc6cc-d19d-492a-abe6-7f5913a0ddd9",
        last_update: "2019-01-22T12:31:38.181182",
        name: "OperatorType1",
        priority: 2
      },
      {
        active: true,
        id: "7c186a39-6df8-41ef-bd4f-a85bbd5ae199",
        last_update: "2019-01-22T12:31:49.428676",
        name: "OperatorType2",
        priority: 1
      }
    ];

    const values = {
      OperatorType2: true,
      OperatorType1: true
    };
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
      .post("/operator_type/update_priority", { resource: operatorsTypes })
      .reply(200, {
        data: { status: "success" }
      })
      .get("/operator_type")
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "operatorsTypes/UPDATE_OPERATORS_TYPES_PRIORITY_REQUEST" },
      {
        type: "operatorsTypes/UPDATE_OPERATORS_TYPES_PRIORITY_SUCCESS",
        payload: { status: "success" }
      },
      {
        type: "toast/SHOW_NOTIFICATION",
        payload: { showing: true, message: "success", type: "success" }
      }
    ];

    return store
      .dispatch(combineOperatorsTypes({ operatorsTypes, values }))
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
        expect(store.getActions()[2]).toEqual(expectedActions[2]);
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

  it("should dispatch DELETE_OPERATOR_TYPE when deleteOperatorType has been done", () => {
    const id = "3a3ded57-9f96-4c93-a471-c27d8182bb9c";

    const body = {
      data: {
        status: "success"
      }
    };

    nock(`${API_URL}`)
      .delete(`/operator_type/${id}`)
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "operatorsTypes/DELETE_OPERATOR_TYPE_REQUEST" },
      {
        type: "operatorsTypes/DELETE_OPERATOR_TYPE_SUCCESS",
        payload: body.data,
        meta: undefined
      }
    ];

    return store.dispatch(deleteOperatorType(id)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("should dispatch CHANGED_TYPES_PRIORITY when showChangedOperatorsTypes has been done", () => {
    const operatorsTypes = [
      {
        active: true,
        id: "eaacc6cc-d19d-492a-abe6-7f5913a0ddd9",
        last_update: "2019-01-22T12:31:38.181182",
        name: "OperatorType1",
        priority: 1
      },
      {
        active: true,
        id: "7c186a39-6df8-41ef-bd4f-a85bbd5ae199",
        last_update: "2019-01-22T12:31:49.428676",
        name: "OperatorType2",
        priority: 2
      }
    ];
    const oldIndex = 0;
    const newIndex = 1;

    const store = mockStore({});

    const expectedActions = [
      {
        type: "operatorsTypesPage/CHANGE_OPERATORS_TYPES_PRIORITY",
        payload: [
          {
            active: true,
            id: "7c186a39-6df8-41ef-bd4f-a85bbd5ae199",
            last_update: "2019-01-22T12:31:49.428676",
            name: "OperatorType2",
            priority: 1
          },
          {
            active: true,
            id: "eaacc6cc-d19d-492a-abe6-7f5913a0ddd9",
            last_update: "2019-01-22T12:31:38.181182",
            name: "OperatorType1",
            priority: 2
          }
        ]
      }
    ];

    return store
      .dispatch(
        showChangedOperatorsTypes({
          operatorsTypes,
          oldIndex,
          newIndex
        })
      )
      .then(() => {
        expect(store.getActions()[0]).toEqual(expectedActions[0]);
      });
  });
});
