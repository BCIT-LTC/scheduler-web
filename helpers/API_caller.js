async function callAPI(path, type, req, queryParams = {}) {
    let status;
    let data;
    let response;
    try {
        const url = new URL('http://host.docker.internal:8000/api/' + path);
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

        if (type.toLowerCase() !== 'get') {
            response = await fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': req.headers.authorization,
                },
                body: JSON.stringify(req.body),
            });
        } else {
            response = await fetch(url, {
                method: type,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': req.headers.authorization,
                }
            });
        }
        data = await response.json();
        status = response.status;
    } catch (error) {
        status = 500;
        data = { error: error.message };
    }
    return { status: status, data: data };
}

module.exports = callAPI;
