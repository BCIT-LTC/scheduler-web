import React from "react";
import "./Alert.css";

function Alert(props) {
  const showInput = props.popupType === "edit";

  return (
    <div className="alert">
      <h2 className="alert-title">{props.title}</h2>
      {showInput ? (
        <div>
          <label>
            <p>Title</p>
            <input id="title" type="text" value={props.announcementTitle}/>
          </label>
          <label>
            <p>Description</p>
            <textarea
              id="description"
              type="text"
              maxLength="200"
              value={props.announcementDescription}
            />
          </label>
        </div>
      ) : (
        <p className="alert-description">{props.description}</p>
      )}
      <div className="alert-buttons">
        <button className="alert-confirm" onClick={props.onConfirm}>
          {props.confirmBtnLabel}
        </button>
        <button className="alert-cancel" onClick={props.onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}


export default Alert;