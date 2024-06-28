import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';
import commonResponseHandler from "../commonResponseHandler";

const url = 'api/announcements';

const useUpdateAnnouncement = () => {
  const globalcontext = useContext(GlobalContext);
  const [updateAnnouncementIsSuccessful, setUpdateAnnouncementIsSuccessful] = useState(false);
  const [updateAnnouncementIsLoading, setUpdateAnnouncementIsLoading] = useState(false);
  const [updateAnnouncementIsSubmitted, setUpdateAnnouncementIsSubmitted] = useState(false);
  const [updateAnnouncementResponseError, setUpdateAnnouncementResponseError] = useState(false);

  const updateAnnouncement = async (event, announcement_id) => {
    event.preventDefault();
    setUpdateAnnouncementIsSubmitted(true);
    setUpdateAnnouncementIsLoading(true);

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
      .then(commonResponseHandler)
      .then((data) => {
        setUpdateAnnouncementIsSuccessful(true);
      })
      .catch((error) => {
        setUpdateAnnouncementIsSuccessful(false);
        setUpdateAnnouncementResponseError(error.message);
        alert(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setUpdateAnnouncementIsLoading(false);
      });
  };

  return { updateAnnouncementIsSuccessful, updateAnnouncementIsLoading, updateAnnouncementIsSubmitted, updateAnnouncementResponseError, updateAnnouncement };
}

export default useUpdateAnnouncement;