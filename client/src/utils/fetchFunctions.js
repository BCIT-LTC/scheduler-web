import Cookies from "js-cookie";

/**
    Sends a POST request to update or create a calendar entry. 
    It can be refactored because api uses upsert rather than update and delete
    @param {Object} forms - The data to be sent in the request body.
    @param {string} updateOrCreate - Specifies whether to update or create a calendar entry.
    @returns {Promise} - A promise that resolves to the fetch response.
*/
export async function updateCalendar(forms, updateOrCreate) {
    return await fetch(
        `${process.env.PUBLIC_URL}/${
            updateOrCreate === "create" ? "calendar" : "openlab"
        } `,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")} `,
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({ forms }),
        }
    );
}

/**
    Sends a GET request to fetch a calendar for a specific month and year.
    @param {number} month - The month for which the calendar is requested.
    @param {number} year - The year for which the calendar is requested.
    @returns {Promise} - A promise that resolves to the fetched calendar data.
*/
export function fetchCalendar(month, year) {
    return fetch(
        `${process.env.PUBLIC_URL}/calendar?month=` + month + "&year=" + year,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")} `,
                "Content-Type": "application/json",
            },
            mode: "cors",
        }
    ).then((results) => {
        if (results.status === 200) {
            return results.json();
        }
    });
}
