const api = require("../api");

describe("API", () => {
  let req;
  let res;

  it("should make a GET request and return the response data", async () => {
    req = {
      path: "/api/users",
      headers: {
        authorization: "auth_token",
      },
      method: "GET",
      body: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const response = await api.all(req, res);
    expect(response).toEqual({ message: "Success" });
  });

  it("should return an error if no auth token is provided", async () => {
    req = {
      path: "/api/users",
      headers: {},
      method: "GET",
      body: {},
    };

    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const response = await api.all(req, res);
    expect(response).toBeInstanceOf(Error);
  });

  it("should return an error if no path is provided", async () => {
    req = {
      path: undefined,
      headers: {
        authorization: "auth_token",
      },
      method: "GET",
      body: {},
    };

    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const response = await api.all(req, res);
    expect(response).toBeInstanceOf(Error);
  });
});
