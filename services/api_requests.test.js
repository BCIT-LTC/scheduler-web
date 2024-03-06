const ApiRequests = require("./api_requests");

describe("ApiRequests", () => {
  let apiRequests;

  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.3KXyQxUHeZCWw7L4Knz0rRrJAFrsugYyMU0zD11oQ2w";

  it("should throw an error if no authToken is provided", () => {
    expect(() => {
      apiRequests = new ApiRequests(
        "https://scheduler-api.ltc.bcit.ca/api/",
        undefined
      );
    }).toThrow("ApiRequest auth_token is undefined");
  });

  it("should throw an error if no path is provided", () => {
    expect(() => {
      apiRequests = new ApiRequests(undefined, authToken);
    }).toThrow("ApiRequests path is undefined");
  });

  it("should make a GET request and return the response data", async () => {
    apiRequests = new ApiRequests(
      "https://scheduler-api.ltc.bcit.ca/api/events/",
      authToken
    );
    const response = await apiRequests.all();

    expect(response).toEqual({ version: "0.0.0" });
  });
});
