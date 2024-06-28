import Cookies from "js-cookie";
import { useState } from "react";
import commonResponseHandler from "../commonResponseHandler";

const url = `api/locations`;

const useGetLocations = () => {
  const [getLocationsData, setGetLocationsData] = useState([]); // This is the data that will be returned from the hook
  const [getLocationsIsSuccessful, setGetLocationsIsSuccessful] = useState(false);
  const [getLocationsIsLoading, setGetLocationsIsLoading] = useState(false);
  const [getLocationsResponseError, setGetLocationsResponseError] = useState(false);

  const getLocations = async () => {
    setGetLocationsIsLoading(true);
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
      .then(commonResponseHandler)
      .then((data) => {
        setGetLocationsData(data);
        setGetLocationsIsSuccessful(true);
      })
      .catch((error) => {
        setGetLocationsIsSuccessful(false);
        setGetLocationsResponseError(error.message);
        alert(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setGetLocationsIsLoading(false);
      });
  };

  return {
    getLocationsData,
    getLocationsIsSuccessful,
    getLocationsIsLoading,
    getLocationsResponseError,
    getLocations
  };
}
export default useGetLocations;
