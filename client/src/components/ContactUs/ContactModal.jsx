import React, {useState, useEffect} from 'react';
import './Contact.css';

const ContactModal = ({onClose}) => {
  const [message, setMessage] = useState(
    'For any questions related to the Open Lab Application or general use of Open Lab, please contact jasica_munday@BCIT.ca. For any other inquiries (e.g. clinical skills) please contact your clinical instructor.'
  );
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleEdit = () => {
    setEditMode(true);
    setEditedMessage(message);
  };

  const handleSave = () => {
    setMessage(editedMessage);
    setEditMode(false);

    // Update the message on the server
    updateMessageOnServer(editedMessage);
  };

  const updateMessageOnServer = async (updatedMessage) => {
    try {
      const response = await fetch('/api/message', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: updatedMessage}),
      });

      if (!response.ok) {
        throw new Error('Failed to update message');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedMessage = localStorage.getItem('contactMessage');
    if (storedMessage) {
      setMessage(storedMessage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contactMessage', message);
  }, [message]);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Contact Us</h2>
        {editMode ? (
          <div>
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
            ></textarea>
            <button className="saveBtn" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          <p>{message}</p>
        )}
        {!editMode && (
          <button className="editBtn" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
