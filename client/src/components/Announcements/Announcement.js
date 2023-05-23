import { useState } from "react";
import "./Announcements.css";
import AnnouncementTable from "./AnnouncementTable";
import Submission from "../Submission";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

/**
 * represents create announcement form
 */
const Announcement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submit, setSubmit] = useState(false);
  const [emptyField, setEmptyField] = useState("");

  const user = jwtDecode(Cookies.get("jwt"));
  const isAdmins = user.isAdmin;

  let date = new Date();
  const [count, setCount] = useState(0);
  const timezone = date.getTimezoneOffset() * 60000;
  const datetime = new Date(Date.now() - timezone)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  /**
   * tracks the number of letter for each field
   */
  const counter = (e) => {
    setCount(e.target.value.length);
  };

  /**
   * onSubmit handler for creae announemnt form
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      setEmptyField("Please fill in all fields");
      return;
    } else {
      return await fetch(`${process.env.PUBLIC_URL}/announcement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify({ title, description, date: datetime }),
      }).then(
        (response) => response.json(),
        setSubmit(true),
        (document.getElementById("title").value = ""),
        (document.getElementById("description").value = ""),
        setEmptyField(""),
        setTitle(""),
        setDescription(""),
        setCount(0)
      );
    }
  };
  const submitButton = document.getElementById("submit-button");
  const buttons = document.querySelectorAll(".button"); //refers to button class from AnnouncementTable

  if (submit) {
    document.body.style.overflowY = "hidden";
    submitButton.setAttribute("disabled", true);
    buttons.forEach((button) => {
      button.disabled = true;
    });
    // Perform the click action here
  } else {
    document.body.style.overflowY = "auto";
    if (submitButton) {
      submitButton.removeAttribute("disabled");
      buttons.forEach((button) => {
        button.disabled = false;
      });
    }
  }

  return (
    <div>
      <div className="announcement-wrapper">
        {isAdmins && (
          <form
            className="form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h2>Create Announcement</h2>
            <label>
              <p>Title</p>
              <input
                id="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <p>Description</p>
              <p className="count">{`${count}/200 Characters`}</p>
              <textarea
                id="description"
                type="text"
                maxLength="200"
                onChange={(e) => {
                  setDescription(e.target.value);
                  counter(e);
                }}
              />
              <div className="error-message">{emptyField}</div>
            </label>
            <div className="submit-button">
              <button id="submit-button" type="submit">
                SUBMIT
              </button>
            </div>
          </form>
        )}
        <div>
          <h3>List of Announcements</h3>
          <AnnouncementTable />
        </div>
        <Submission
          trigger={submit}
          setTrigger={setSubmit}
          isOpen={submit}
          onClose={() => setSubmit(false)}
          title="Announcement Created"
        />
      </div>
    </div>
  );
};

export default Announcement;
