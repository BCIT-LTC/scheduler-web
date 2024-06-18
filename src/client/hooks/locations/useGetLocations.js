import Cookies from "js-cookie";
import { useState } from "react";

const url = `api/locations`;

const useGetLocations = () => {
  const [data, setData] = useState([]); // This is the data that will be returned from the hook
  const [isSuccessful, setisSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(false);


  const getLocations = async () => {
    setIsLoading(true);
    await fetch(url, {
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
        setData(data);
        setisSuccessful(true);
      })
      .catch((error) => {
        setisSuccessful(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    data,
    isSuccessful,
    isLoading,
    responseError,
    getLocations
  };
}
export default useGetLocations;
