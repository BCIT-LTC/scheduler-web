/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This file contains the class ApiRequests. This class is used to make requests to the API.
 */
module.exports = class ApiRequests {
  constructor(path, auth_token, method, body) {

    console.log("PATH: " + path);
    if (path === undefined) {
      throw new Error("ApiRequests path is undefined");
    }
    if (auth_token === undefined) {
      throw new Error("ApiRequest auth_token is undefined");
    }
    if (process.env.API_URL === undefined) {
        this.url = path;
    } else {
        if(path.substring(0, 5) === "/api/") {
            path = path.substring(5);
        }
        this.url = new URL(process.env.API_URL + path);
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
      console.log(".all() URL: " +  this.url);
      console.log(".all() OPTIONS METHOD: " + this.fetchoptions.method);
      console.log(".all() OPTIONS HEADERS: ", Object.fromEntries(this.fetchoptions.headers.entries()));
      console.log(".all() OPTIONS MODE: " + this.fetchoptions.mode);
      let response = await fetch(this.url, this.fetchoptions);
      console.log(".all() response.status: " + response.status);

      data = await response.json();

      console.log(".all() data: ", data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
