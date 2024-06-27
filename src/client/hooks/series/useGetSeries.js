import Cookies from "js-cookie";
import { useState } from "react";
import commonResponseHandler from "../commonResponseHandler";

const url = `api/series`;

const useGetSeries = () => {
  const [getSeriesData, setGetSeriesData] = useState(null); // This is the data that will be returned from the hook
  const [getSeriesIsSuccessful, setGetSeriesIsSuccessful] = useState(false);
  const [getSeriesIsLoading, setGetSeriesIsLoading] = useState(false);
  const [getSeriesResponseError, setGetSeriesResponseError] = useState(false);

  const getSeries = async (event_id) => {
    setGetSeriesIsLoading(true);
    await fetch(`${url}/${event_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
      .then(commonResponseHandler)
      .then((data) => {
        setGetSeriesData(data);
        setGetSeriesIsSuccessful(true);
      })
      .catch((error) => {
        setGetSeriesIsSuccessful(false);
        setGetSeriesResponseError(error.message);
        alert(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setGetSeriesIsLoading(false);
      });
  };

  return {
    getSeriesData,
    getSeriesIsSuccessful,
    getSeriesIsLoading,
    getSeriesResponseError,
    getSeries
  };
}
export default useGetSeries;
