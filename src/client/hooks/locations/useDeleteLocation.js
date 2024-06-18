import Cookies from "js-cookie";
import { useState } from 'react';

const url = 'api/locations';

const useDeleteLocation = () => {
  const [isSuccessful, setisSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const deleteLocation = async (event, location_id) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true);
    

    await fetch(`${url}/${location_id}`, {
      method: 'DELETE',
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
        setisSuccessful(true);
      })
      .catch((error) => {
        setisSuccessful(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isSuccessful, isLoading, isSubmitted, responseError, deleteLocation };
}

export default useDeleteLocation;