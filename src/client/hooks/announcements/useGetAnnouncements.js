import Cookies from "js-cookie";
import { useState } from "react";
import commonResponseHandler from "../commonResponseHandler";

const url = 'api/announcements';

const useGetAnnouncements = () => {
  const [getAnnouncementsData, setGetAnnouncementsData] = useState(null); // This is the data that will be returned from the hook
  const [getAnnouncementsIsSuccessful, setGetAnnouncementIsSuccessful] = useState(false);
  const [getAnnouncementsIsLoading, setGetAnnouncementsIsLoading] = useState(false);
  const [getAnnouncementsResponseError, setGetAnnouncementsResponseError] = useState(false);


  const getAnnouncements = async () => {
    setGetAnnouncementsIsLoading(true);

    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get("default_jwt")}`,
      },
    })
      .then(commonResponseHandler)
      .then((data) => {
        setGetAnnouncementsData(data);
        setGetAnnouncementIsSuccessful(true);
      })
      .catch((error) => {
        setGetAnnouncementIsSuccessful(false);
        setGetAnnouncementsResponseError(error.message);
        console.error(error.message);
      })
      .finally(() => {
        setGetAnnouncementsIsLoading(false);
      });
  };

  return {
    getAnnouncementsData,
    getAnnouncementsIsSuccessful,
    getAnnouncementsIsLoading,
    getAnnouncementsResponseError,
    getAnnouncements
  };
}
export default useGetAnnouncements;
