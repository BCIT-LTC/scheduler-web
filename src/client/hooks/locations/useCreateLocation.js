import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';

const url = `api/locations`;

const useCreateLocation = () => {
  const globalcontext = useContext(GlobalContext);
  const [isSuccessful, setisSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const createLocation = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true);
    
    let payload = {
      room_location: event.target.room_location.value,
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

  return { isSuccessful, isLoading, isSubmitted, responseError, createLocation };
}

export default useCreateLocation;