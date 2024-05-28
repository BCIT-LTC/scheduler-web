import { useNavigate } from "react-router-dom";

/**
 *  Logout function will remove the JWT token from the cookies and
 *  send the user back to the home page.
 */
export default function logout() {
  const navigate = useNavigate();

  fetch("/logout", {
    method: "POST",
    credentials: "include", // Include credentials (cookies) in the request
  })
    .then(() => {
      // Once the request is successful, redirect the user
      navigate("/");
    })
    .catch((error) => {
      // Handle any errors that occur during the request
      console.error("Logout error:", error);
    });
}
