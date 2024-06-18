/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This file contains the class ApiRequests. This class is used to make requests to the API.
 */

const logger = require("../logger.cjs")(__filename);
module.exports = class ApiRequests {
  constructor(path, auth_token, method, body) {

    if (!path) {
      throw new Error("ApiRequests path is undefined");
    }
    if (!auth_token) {
      throw new Error("ApiRequest auth_token is undefined");
    }
    if (!process.env.API_URL) {
      throw new Error("Scheduler-API endpoint not defined");
    } else {
      let api_url = new URL(process.env.API_URL);
      this.url = new URL(path, api_url.href);
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", auth_token);
    this.fetchoptions = {
      method: method,
      headers: headers,
      mode: "cors",
    };
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) && body) {
      this.fetchoptions.body = JSON.stringify(body);
    }
  }

  /**
   * This file contains the function used to call APIs on the serverside.
   * It works in conjunction with the client side API routes.
   * Will GET, POST, PUT, DELETE to the API.
   *
   * @returns {Promise<any>} - The response data from the API call.
   */
  async all() {
    try {
      const response = await fetch(this.url, this.fetchoptions);
      const data = await response.json();
      const statuscode = response.status;
      return {statuscode, data};
    } catch (error) {
      logger.error("Error in ApiRequests call: ", error);
      return error;
    }
  }
};
