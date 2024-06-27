import Cookies from "js-cookie";
import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/usercontext';
import commonResponseHandler from "../commonResponseHandler";

const url = 'api/announcements';

const useCreateAnnouncement = () => {
  const globalcontext = useContext(GlobalContext);
  const [createAnnouncementIsSuccessful, setCreateAnnouncementIsSuccessful] = useState(false);
  const [createAnnouncementIsLoading, setCreateAnnouncementIsLoading] = useState(false);
  const [createAnnouncementIsSubmitted, setCreateAnnouncementIsSubmitted] = useState(false);
  const [createAnnouncementResponseError, setCreateAnnouncementResponseError] = useState(false);

  const createAnnouncement = async (event) => {
    event.preventDefault();
    setCreateAnnouncementIsSubmitted(true);
    setCreateAnnouncementIsLoading(true);

    let payload = {
      title: event.target.title.value,
      description: event.target.description.value,
      event_id: event.target.event_id?.value ? event.target.event_id.value : null,
      created_by: globalcontext.user.email,
      // created_at: new Date().toISOString(),
    };
    console.table(payload);
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
        setCreateAnnouncementIsSuccessful(true);
      })
      .catch((error) => {
        setCreateAnnouncementIsSuccessful(false);
        setCreateAnnouncementResponseError(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setCreateAnnouncementIsLoading(false);
      });
  };

  return { createAnnouncementIsSuccessful, createAnnouncementIsLoading, createAnnouncementIsSubmitted, createAnnouncementResponseError, createAnnouncement };
}

export default useCreateAnnouncement;