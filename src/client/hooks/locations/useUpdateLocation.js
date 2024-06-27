import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';
import commonResponseHandler from "../commonResponseHandler";

const url = 'api/locations';

const useUpdateLocation = () => {
  const globalcontext = useContext(GlobalContext);
  const [updateLocationIsSuccessful, setUpdateLocationIsSuccessful] = useState(false);
  const [updateLocationIsLoading, setUpdateLocationIsLoading] = useState(false);
  const [updateLocationIsSubmitted, setUpdateLocationIsSubmitted] = useState(false);
  const [updateLocationResponseError, setUpdateLocationResponseError] = useState(false);


  const updateLocation = async (event, location_id) => {
    event.preventDefault();
    setUpdateLocationIsSubmitted(true);
    setUpdateLocationIsLoading(true);

    let payload = {
      room_location: event.target.room_location.value,
      modified_by: globalcontext.user.email
    };

    await fetch(`${url}/${location_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
      body: JSON.stringify(payload),
    })
      .then(commonResponseHandler)
      .then((data) => {
        setUpdateLocationIsSuccessful(true);
      })
      .catch((error) => {
        setUpdateLocationIsSuccessful(false);
        setUpdateLocationResponseError(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setUpdateLocationIsLoading(false);
      });
  };
  return { updateLocationIsSuccessful, updateLocationIsLoading, updateLocationIsSubmitted, updateLocationResponseError, updateLocation };
};

export default useUpdateLocation;