import Cookies from "js-cookie";
export async function updateCalendar(forms, updateOrCreate) {
    return await fetch(
        `${process.env.PUBLIC_URL}/${updateOrCreate === "create" ? "calendar" : "openlab"
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

export function fetchCalendar(month, year) {
    return fetch(`${process.env.PUBLIC_URL}/calendar?month=` + month + '&year=' + year, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${Cookies.get("jwt")} `,
            "Content-Type": "application/json",
        },
        mode: "cors",
    }).then((results) => {
        if (results.status === 200) {
            return results.json();
        }
    });
}
