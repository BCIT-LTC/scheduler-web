import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import commonResponseHandler from "../commonResponseHandler";

const url = `api/series`;

dayjs.extend(utc);


const useCreateSeries = () => {
    const globalcontext = useContext(GlobalContext);
    const [createSeriesIsSuccessful, setCreateSeriesIsSuccessful] = useState(false);
    const [createSeriesIsLoading, setCreateSeriesIsLoading] = useState(false);
    const [createSeriesIsSubmitted, setCreateSeriesIsSubmitted] = useState(false);
    const [createSeriesResponseError, setCreateSeriesResponseError] = useState(false);

    const createSeries = async (event) => {
        event.preventDefault();
        setCreateSeriesIsSubmitted(true);
        setCreateSeriesIsLoading(true);

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
            created_by: globalcontext.user.email
        };

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify(payload),
        })
            .then(commonResponseHandler)
            .then((data) => {
                setCreateSeriesIsSuccessful(true);
            })
            .catch((error) => {
                setCreateSeriesIsSuccessful(false);
                setCreateSeriesResponseError(error.message);
                alert(error.message);
                console.error(error.message);
            })
            .finally(() => {
                setCreateSeriesIsLoading(false);
            });
    };

    return { createSeriesIsSuccessful, createSeriesIsLoading, createSeriesIsSubmitted, createSeriesResponseError, createSeries };
};

export default useCreateSeries;