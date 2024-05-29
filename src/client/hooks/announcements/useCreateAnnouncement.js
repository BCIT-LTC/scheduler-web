import { useState, useCallback, useContext } from "react";
import { GlobalContext } from "../../context/usercontext";
import Cookies from "js-cookie";

/**
 * Custom hook to create an announcement
 * This hook is used in the Announcements container
 * It makes a POST request to the server to create an announcement
 *
 * @returns {{createAnnouncement: function, error: string | null, isSuccessful: boolean}}
 */
const useCreateAnnouncement = () => {
  const globalContext = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(false);

  /**
   * Function to make a POST request to the server to create an announcement
   *
   * @param {string} title - The title of the announcement
   * @param {string} description - The description of the announcement
   * @param {string} date - The creation date of the announcement
   * @param {function} onSuccess - Callback function on success
   * @param {function} onError - Callback function on error
   */
  const createAnnouncement = useCallback(
    async (title, description, date, onSuccess, onError) => {
      const jwtToken = Cookies.get("default_jwt");
      const user = globalContext.user.email;
      const formattedDate = new Date().toISOString();

      const payload = {
        title: String(title),
        description: String(description),
        created_by: String(user),
        created_at: formattedDate,
      };

      console.log("Payload being sent:", JSON.stringify(payload));

      try {
        const response = await fetch("/api/announcement", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(payload),
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
        setIsSuccessful(true);
        if (onSuccess) onSuccess(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setIsSuccessful(false);
        if (onError) onError(error.message);
      }
    },
    [globalContext.user.email]
  );

  return { createAnnouncement, error, isSuccessful };
};

export default useCreateAnnouncement;
