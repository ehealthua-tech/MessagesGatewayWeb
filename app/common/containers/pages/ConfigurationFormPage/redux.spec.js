import nock from "nock";
import { API_URL } from "../../../config";
import { fetchConfiguration, updateConfiguration } from "./redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";

const mockStore = configureMockStore([thunk, apiMiddleware]);

describe("async configuration actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it("should dispatch FETCH_CONFIGURATION when fetchConfiguration has been done", () => {
    const body = {
      data: {
        default_sms_operator: "",
        org_name: "test",
        sending_time: 60
      }
    };

    nock(`${API_URL}`)
      .get("/system_config")
      .reply(200, body);

    const store = mockStore({});

    const expectedActions = [
      { type: "configuration/FETCH_CONFIGURATION_REQUEST" },
      {
        type: "configuration/FETCH_CONFIGURATION_SUCCESS",
        payload: body.data,
        meta: undefined
      }
    ];

    return store.dispatch(fetchConfiguration()).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });

  it("should dispatch UPDATE_CONFIGURATION when updateConfiguration has been done", () => {
    const values = {
      default_sms_operator: "default_sms_operator",
      org_name: "test",
      sending_time: "60"
    };

    const body = {
      data: {
        status: "success"
      }
    };

    nock(`${API_URL}`)
      .post(`/system_config`, {
        resource: values
      })
      .reply(200, body)
      .get("/system_config")
      .reply(500);

    const store = mockStore({});

    const expectedActions = [
      { type: "configuration/UPDATE_CONFIGURATION_REQUEST" },
      {
        type: "configuration/UPDATE_CONFIGURATION_SUCCESS",
        payload: body.data,
        meta: undefined
      }
    ];

    return store.dispatch(updateConfiguration({ values })).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
      expect(store.getActions()[1]).toEqual(expectedActions[1]);
    });
  });
});
