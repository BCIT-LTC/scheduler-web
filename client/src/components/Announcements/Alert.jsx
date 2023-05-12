import React, { useState } from "react";
import "./Alert.css";

function Alert(props) {
  const [title, setTitle] = useState(props.announcementTitle);
  const [description, setDescription] = useState(props.announcementDescription);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleConfirm = () => {
    props.onConfirm(title, description);
  };

  return (
    <div className="alert">
      <h2 className="alert-title">{props.title}</h2>
      {props.popupType === "edit" ? (
        <div>
          <label>
            <p>Title</p>
            <input id="title" type="text" value={title} onChange={handleTitleChange}/>
          </label>
          <label>
            <p>Description</p>
            <textarea
              id="description"
              type="text"
              maxLength="200"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
      ) : (
        <p className="alert-description">{props.description}</p>
      )}
      <div className="alert-buttons">
        <button className="alert-confirm" onClick={handleConfirm}>
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