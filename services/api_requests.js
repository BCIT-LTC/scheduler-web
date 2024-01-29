/**
 * This is a description of the MyClass constructor function.
 * @class
 * @classdesc This file contains the class ApiRequests. This class is used to make requests to the API.
 */
module.exports = class ApiRequests {
    constructor(path, auth_token, body) {
        if (path === undefined) {
            throw new Error("ApiRequests path is undefined");
        }
        if (auth_token === undefined) {
            throw new Error("ApiRequest auth_token is undefined");
        }
        this.url = new URL(process.env.API_URL + path)
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", auth_token);
        this.fetchoptions = {
            headers: headers,
            mode: "cors",
            body: body
        };
    }

    /**
     * This file contains the function used to call APIs on the serverside.
     * It works in conjunction with the client side API routes.
     *
     * @returns {<{data: {error}, status: number}>}
     */
    async get() {
        this.fetchoptions.method = "GET";
        let data;
        try {
            let response = await fetch(this.url, this.fetchoptions)
            data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    // used to create new records
    post() {
        console.log("post");
    }

    //used to update existing records
    put() {
        console.log("put");
    }

    //used to delete records
    delete() {
        console.log("delete");
    }
}
