import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';

const url = 'api/announcements';

const useUpdateAnnouncement = () => {
  const globalcontext = useContext(GlobalContext);
  const [isSuccessful, setisSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseError, setResponseError] = useState(false);

  const updateAnnouncement = async (event, announcement_id) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsLoading(true);
    
    let payload = {
      title: event.target.title.value,
      description: event.target.description.value,
      modified_by: globalcontext.user.email,
      // created_at: new Date().toISOString(),
    };

    await fetch(`${url}/${announcement_id}`, {
      method: 'PUT',
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

  return { isSuccessful, isLoading, isSubmitted, responseError, updateAnnouncement };
}

export default useUpdateAnnouncement;