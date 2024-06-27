import Cookies from "js-cookie";
import { useState } from 'react';
import commonResponseHandler from "../commonResponseHandler";

const url = `api/series`;

const useDeleteSeries = () => {
    const [deleteSeriesIsSuccessful, setDeleteSeriesIsSuccessful] = useState(false);
    const [deleteSeriesIsLoading, setDeleteSeriesIsLoading] = useState(false);
    const [deleteSeriesIsSubmitted, setDeleteSeriesIsSubmitted] = useState(false);
    const [deleteSeriesResponseError, setDeleteSeriesResponseError] = useState(false);

    const deleteSeries = async (event, series_id) => {
        event.preventDefault();
        setDeleteSeriesIsSubmitted(true);
        setDeleteSeriesIsLoading(true);

        await fetch(`${url}/${series_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            }
        })
            .then(commonResponseHandler)
            .then((data) => {
                setDeleteSeriesIsSuccessful(true);
            })
            .catch((error) => {
                setDeleteSeriesIsSuccessful(false);
                setDeleteSeriesResponseError(error.message);
                console.error(error.message);
            })
            .finally(() => {
                setDeleteSeriesIsLoading(false);
            });
    };

    return { deleteSeriesIsSuccessful, deleteSeriesIsLoading, deleteSeriesIsSubmitted, deleteSeriesResponseError, deleteSeries };
};

export default useDeleteSeries;