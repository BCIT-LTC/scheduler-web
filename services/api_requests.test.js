const ApiRequests = require('./api_requests');

describe('ApiRequests', () => {
  let apiRequests;

  beforeEach(() => {
    apiRequests = new ApiRequests("https://scheduler-api.ltc.bcit.ca/api/", "auth_token");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should make a GET request and return the response data', async () => {
    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ message: 'Success' }),
    });

    const response = await apiRequests.get();

    expect(fetch).toHaveBeenCalledWith(apiRequests.url, apiRequests.fetchoptions);
    expect(response).toEqual({ message: 'Success' });
  });

  it('should handle errors and return the error object', async () => {
    // Mock the fetch function to throw an error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const response = await apiRequests.get();

    expect(fetch).toHaveBeenCalledWith(apiRequests.url, apiRequests.fetchoptions);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe('Network error');
  });
});