import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
const url = `api/series`;

dayjs.extend(utc);


const useUpdateSeries = () => {
    const globalcontext = useContext(GlobalContext);
    const [isSuccessful, setisSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseError, setResponseError] = useState(false);

    const updateSeries = async (event, series_id) => {
        event.preventDefault();
        setIsSubmitted(true);
        setIsLoading(true);

        const startDate = dayjs(new Date(event.target.start_date.value).toISOString());
        const startTime = dayjs(event.target.start_time.value, "hh:mm A");

        const start_time = dayjs()
            .year(startDate.year())
            .month(startDate.month())
            .date(startDate.date())
            .hour(startTime.hour())
            .minute(startTime.minute())
            .toISOString();

        const endDate = dayjs(new Date(event.target.end_date.value).toISOString());
        const endTime = dayjs(event.target.end_time.value, "hh:mm A");
        const end_time = dayjs()
            .year(endDate.year())
            .month(endDate.month())
            .date(endDate.date())
            .hour(endTime.hour())
            .minute(endTime.minute())
            .toISOString();

        // recurrence_frequency_days would be an array of integers with value from checkboxes named day-0 to day-6
        let recurrence_frequency_days = [];
        for (let i = 0; i < 7; i++) {
            if (event.target[`day-${i}`].checked) {
                recurrence_frequency_days.push(i);
            }
        }
        let payload = {
            series_title: event.target.summary.value,
            location_id: parseInt(event.target.location_id.value),
            start_time: start_time,
            end_time: end_time,
            recurrence_frequency_weeks: parseInt(event.target.recurrence_frequency_weeks.value),
            start_date: start_time,
            end_date: end_time,
            recurrence_frequency_days: recurrence_frequency_days,
            facilitator: event.target.facilitator.value,
            description: event.target.description.value,
            status: event.target.status.value,
            modified_by: globalcontext.user.email
        };

        await fetch(`${url}/${series_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                // Checking if the response is successful
                if (!response.ok) {
                    // If response is not ok, throw an error with the response data
                    return response.json().then(errorData => {
                        setResponseError(errorData);
                        throw new Error('Error from backend');
                    });
                }
                return response.json();
            })
            .then((data) => {
                setisSuccessful(true);
            })
            .catch((error) => {
                setisSuccessful(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return { isSuccessful, isLoading, isSubmitted, responseError, updateSeries };
};

export default useUpdateSeries;