import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';
import commonResponseHandler from "../commonResponseHandler";

const url = `api/locations`;

const useCreateLocation = () => {
  const globalcontext = useContext(GlobalContext);
  const [createLocationIsSuccessful, setCreateLocationIsSuccessful] = useState(false);
  const [createLocationIsLoading, setCreateLocationIsLoading] = useState(false);
  const [createLocationIsSubmitted, setCreateLocationIsSubmitted] = useState(false);
  const [createLocationResponseError, setCreateLocationResponseError] = useState(false);

  const createLocation = async (event) => {
    event.preventDefault();
    setCreateLocationIsSubmitted(true);
    setCreateLocationIsLoading(true);

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
      .then(commonResponseHandler)
      .then((data) => {
        setCreateLocationIsSuccessful(true);
      })
      .catch((error) => {
        setCreateLocationIsSuccessful(false);
        setCreateLocationResponseError(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setCreateLocationIsLoading(false);
      });
  };

  return { createLocationIsSuccessful, createLocationIsLoading, createLocationIsSubmitted, createLocationResponseError, createLocation };
}

export default useCreateLocation;