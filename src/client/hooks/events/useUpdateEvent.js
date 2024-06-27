import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import commonResponseHandler from "../commonResponseHandler";

const url = `api/events`;

dayjs.extend(utc);

const useUpdateEvent = () => {
    const globalcontext = useContext(GlobalContext);
    const [updateEventIsSuccessful, setUpdateEventIsSuccessful] = useState(false);
    const [updateEventIsLoading, setUpdateEventIsLoading] = useState(false);
    const [updateEventIsSubmitted, setUpdateEventIsSubmitted] = useState(false);
    const [updateEventResponseError, setUpdateEventResponseError] = useState(false);

    const updateEvent = async (event, event_id) => {
        event.preventDefault();
        setUpdateEventIsSubmitted(true);
        setUpdateEventIsLoading(true);

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

        let payload = {
            event_id: event_id,
            summary: event.target.summary.value,
            location_id: parseInt(event.target.location_id.value),
            start_time: start_time,
            end_time: end_time,
            facilitator: event.target.facilitator.value,
            description: event.target.description.value,
            status: event.target.status.value,
            // is_holiday: event.target.is_holiday.checked,
            modified_by: globalcontext.user.email
        };

        await fetch(`${url}/${event_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify(payload),
        })
            .then(commonResponseHandler)
            .then((data) => {
                setUpdateEventIsSuccessful(true);
            })
            .catch((error) => {
                setUpdateEventIsSuccessful(false);
                setUpdateEventResponseError(error.message);
                console.error(error.message);
            })
            .finally(() => {
                setUpdateEventIsLoading(false);
            });
    };

    return { updateEventIsSuccessful, updateEventIsLoading, updateEventIsSubmitted, updateEventResponseError, updateEvent };
};

export default useUpdateEvent;