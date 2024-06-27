import Cookies from "js-cookie";
import { useState } from 'react';
import commonResponseHandler from "../commonResponseHandler";

const url = 'api/locations';

const useDeleteLocation = () => {
  const [deleteLocationIsSuccessful, setDeleteLocationIsSuccessful] = useState(false);
  const [deleteLocationIsLoading, setDeleteLocationIsLoading] = useState(false);
  const [deleteLocationIsSubmitted, setDeleteLocationIsSubmitted] = useState(false);
  const [deleteLocationResponseError, setDeleteLocationResponseError] = useState(false);

  const deleteLocation = async (event, location_id) => {
    event.preventDefault();
    setDeleteLocationIsSubmitted(true);
    setDeleteLocationIsLoading(true);

    await fetch(`${url}/${location_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
      .then(commonResponseHandler)
      .then((data) => {
        setDeleteLocationIsSuccessful(true);
      })
      .catch((error) => {
        setDeleteLocationIsSuccessful(false);
        setDeleteLocationResponseError(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setDeleteLocationIsLoading(false);
      });
  };

  return { deleteLocationIsSuccessful, deleteLocationIsLoading, deleteLocationIsSubmitted, deleteLocationResponseError, deleteLocation };
}

export default useDeleteLocation;