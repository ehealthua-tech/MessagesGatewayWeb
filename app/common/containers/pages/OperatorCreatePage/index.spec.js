import nock from "nock";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { apiMiddleware } from "redux-api-middleware";
import { addOperator } from "./redux";
import { API_URL } from "../../../config";

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe("async operators actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("should dispatch ADD_OPERATOR when addOperatorDetail has been done", () => {
    const values = {
      active: true,
      config: { auth_token: "test_token" },
      limit: 1,
      name: "test",
      price: 20,
      priority: 1
    };

    const id = "a1db6551-a8c8-4285-9497-92210e622327";
    const name = "viber_protocol";

    nock(`${API_URL}`)
      .post("/operators", {
        resource: {
          ...values,
          operator_type_id: id,
          protocol_name: name
        }
      })
      .reply(200, {
        data: { status: "success" }
      });

    const store = mockStore({});

    const expectedActions = [
      { type: "operators/ADD_OPERATOR_REQUEST" },
      {
        type: "operators/ADD_OPERATOR_SUCCESS",
        payload: { status: "success" }
      }
    ];

    return store.dispatch(addOperator({ values, id, name })).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });
});
