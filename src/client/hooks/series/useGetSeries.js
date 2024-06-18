import Cookies from "js-cookie";
import { useState } from "react";

const url = `api/series`;

const useGetSeries = () => {
  const [data, setData] = useState(null); // This is the data that will be returned from the hook
  const [isSuccessful, setisSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(false);


  const getSeries = async (event_id) => {
    let seriesData = null;
    setIsLoading(true);
    await fetch(`${url}/${event_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
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
        seriesData = data;
        setData(data);
        setisSuccessful(true);
      })
      .catch((error) => {
        setisSuccessful(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return seriesData;
  };

  return {
    data,
    isSuccessful,
    isLoading,
    responseError,
    getSeries
  };
}
export default useGetSeries;
