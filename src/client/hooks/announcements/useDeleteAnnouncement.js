import { useState, useCallback } from "react";
import Cookies from "js-cookie";

/**
 * Custom hook to delete an announcement
 * This hook is used in the Announcements container
 * It makes a DELETE request to the server to delete an announcement
 *
 * @returns {{isDeleted: boolean, error: unknown, deleteAnnouncement: deleteAnnouncement}}
 */
const useDeleteAnnouncements = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Function to make a DELETE request to the client-side route to delete an announcement
   *
   * @param {string} id - The ID of the announcement
   * @param {function} onSuccess - Callback function on success
   * @param {function} onError - Callback function on error
   */
  const deleteAnnouncement = useCallback(async (id, onSuccess, onError) => {
    const jwtToken = Cookies.get("default_jwt");

    console.log("Deleting announcement with ID:", id);

    try {
      const response = await fetch(`/api/announcement/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        mode: "cors",
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error(
          `Error: ${response.status}, ${JSON.stringify(errorData)}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);
      setIsDeleted(true);
      if (onSuccess) onSuccess(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      if (onError) onError(error.message);
    }
  }, []);

  return { deleteAnnouncement, isDeleted, error };
};

export default useDeleteAnnouncements;
