const commonResponseHandler = (response) => {
    if (!response.ok) {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            return response.json().then(errorData => {
                if (errorData.errors) {
                    throw new Error(errorData.errors);
                }
            });
        } else {
            throw new Error('Response is not JSON');
        }
    }
    return response.json();
};

export default commonResponseHandler;