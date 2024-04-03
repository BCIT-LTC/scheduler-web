/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This file contains the class ApiRequests. This class is used to make requests to the API.
 */
module.exports = class ApiRequests {
  constructor(path, auth_token, method, body) {

    if (path === undefined) {
      throw new Error("ApiRequests path is undefined");
    }
    if (auth_token === undefined) {
      throw new Error("ApiRequest auth_token is undefined");
    }
    if (process.env.API_URL === undefined) {
      throw new Error("Scheduler-API endpoint not defined");
    } else {
      let api_url = new URL(process.env.API_URL);
      let api_hostWithPort = api_url.protocol + '//' + api_url.hostname + (api_url.port ? ':' + api_url.port : '');
      this.url = new URL(path, api_hostWithPort);
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", auth_token);
    this.fetchoptions = {
      method: method,
      headers: headers,
      mode: "cors",
    };
    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      this.fetchoptions.body = body;
    }
  }

  /**
   * This file contains the function used to call APIs on the serverside.
   * It works in conjunction with the client side API routes.
   * Will GET, POST, PUT, DELETE to the API.
   *
   * @returns {<{data: {error}, status: number}>}
   */
  async all() {
    let data;
    try {
      let response = await fetch(this.url, this.fetchoptions);
      data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
