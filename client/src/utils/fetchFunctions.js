export function updateCalendar(forms, updateOrCreate) {
  return fetch(`http://localhost:8000/api/${updateOrCreate === "create" ? "calendar" : "openlab"}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify({ forms })
  })
}

export function fetchCalendar(month) {
  return fetch("http://localhost:8000/api/calendar?month=" + month, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
  }).then((results) => {
    if (results.status === 200) {
      return results.json()
    }
  })
}
