import { useState } from "react";
import FaqTable from "./FaqTable";
import Submission from "../Submission";
import Cookies from "js-cookie";
import "./Faq.css";

const Faq = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [submit, setSubmit] = useState(false); // for submission window component
  const [emptyField, setEmptyField] = useState("");
  const [count, setCount] = useState(0);

  const counter = (e) => {
    setCount(e.target.value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question === "" || answer === "") {
      setEmptyField("Please fill in all fields");
      return;
    } else {
      return await fetch(`${process.env.PUBLIC_URL}/faq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify({ question, answer }),
      }).then(
        (response) => response.json(),
        setSubmit(true),
        (document.getElementById("question").value = ""),
        (document.getElementById("answer").value = ""),
        setEmptyField(""),
        setQuestion(""),
        setAnswer(""),
        setCount(0)
      );
    }
  };
  const submitButton = document.getElementById("submit-button");
  const buttons = document.querySelectorAll(".button"); //refers to button class from FaqTable

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
      <div className="faq-wrapper">
        <form
          className="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2>Create FAQ Item</h2>
          <label>
            <p>Question</p>
            <input
              id="question"
              type="text"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>
          <label>
            <p>Answer</p>
            <p className="count">{`${count}/200 Characters`}</p>
            <textarea
              id="answer"
              type="text"
              maxLength="200"
              onChange={(e) => {
                setAnswer(e.target.value);
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
        <div>
          <h3>Frequently Asked Questions</h3>
          <FaqTable />
        </div>
        <Submission
          trigger={submit}
          setTrigger={setSubmit}
          isOpen={submit}
          onClose={() => setSubmit(false)}
          title="Faq Created"
        />
      </div>
    </div>
  );
};

export default Faq;
