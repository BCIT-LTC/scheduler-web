import Cookies from "js-cookie";
import { useState } from 'react';
import commonResponseHandler from "../commonResponseHandler";

const url = 'api/announcements';

const useDeleteAnnouncement = () => {
  const [deleteAnnouncementIsSuccessful, setDeleteAnnouncementIsSuccessful] = useState(false);
  const [deleteAnnouncementIsLoading, setDeleteAnnouncementIsLoading] = useState(false);
  const [deleteAnnouncementIsSubmitted, setDeleteAnnouncementIsSubmitted] = useState(false);
  const [deleteAnnouncementResponseError, setDeleteAnnouncementResponseError] = useState(false);

  const deleteAnnouncement = async (event, announcement_id) => {
    event.preventDefault();
    setDeleteAnnouncementIsSubmitted(true);
    setDeleteAnnouncementIsLoading(true);

    await fetch(`${url}/${announcement_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
      .then(commonResponseHandler)
      .then((data) => {
        setDeleteAnnouncementIsSuccessful(true);
      })
      .catch((error) => {
        setDeleteAnnouncementIsSuccessful(false);
        setDeleteAnnouncementResponseError(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setDeleteAnnouncementIsLoading(false);
      });
  };

  return { deleteAnnouncementIsSuccessful, deleteAnnouncementIsLoading, deleteAnnouncementIsSubmitted, deleteAnnouncementResponseError, deleteAnnouncement };
}

export default useDeleteAnnouncement;