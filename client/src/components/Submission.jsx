import React from "react";
import "./Alert.css";

/**
 * represents message after submission on announcement and faq page
 */
function Submission(props) {
  return (props.trigger) ? (
    <div className="alert">
      <h2 className="alert-title">{props.title}</h2>
          <div className="alert-buttons">
        <button className="alert-ok" onClick={() => props.setTrigger(false)}>
          OK
        </button>
      
      </div>
    </div>
  ) : "";
}

export default Submission;  