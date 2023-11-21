/**
 * This file contains the function used to call APIs on the serverside.
 * It works in conjunction with the client side API routes.
 *
 * @param path
 * @param type
 * @param req
 * @param queryParams
 * @returns {Promise<{data: {error}, status: number}>}
 */
async function callAPI(path, type, req, queryParams = {}) {
    let status;
    let data;
    let response;
    try {
        const url = new URL(process.env.API_URL + path);
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

        const requestOptions = {
            method: type,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
            },
        };

        if (type.toLowerCase() !== 'get') {
            requestOptions.body = JSON.stringify(req.body);
        }

        response = await fetch(url, requestOptions);
        const text = await response.text();
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse as JSON:', text);
            throw e; // Rethrow the parsing error
        }

        status = response.status;
    } catch (error) {
        console.log(error.message);
        status = 500;
        data = { error: error.message };
    }
    return { status: status, data: data };
}

module.exports = callAPI;
