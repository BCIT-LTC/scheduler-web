// Description: This file contains the class ApiRequests. This class is used to make requests to the API.

module.exports = class ApiRequests {
    constructor(path, auth_token, body) {
        if (path === undefined) {
            throw new Error("path is undefined");
        }
        if (auth_token === undefined) {
            throw new Error("auth_token is undefined");
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
    
    // used to get records
    async get() {
        console.log("get");
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
