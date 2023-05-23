import React, {useState, useEffect} from 'react';
import './Contact.css';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

/**
 * represents modal window for contact infromation
 */
const ContactModal = ({onClose}) => {
  // State variables
  const [message, setMessage] = useState(
    'For any questions related to the Open Lab Application or general use of Open Lab, please contact jasica_munday@BCIT.ca. For any other inquiries (e.g. clinical skills) please contact your clinical instructor.'
  );
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  // Check if the user is an admin
  const user = jwtDecode(Cookies.get('jwt'));
  const isAdmin = user.isAdmin;

  // Event handler for entering edit mode
  const handleEdit = () => {
    setEditMode(true);
    setEditedMessage(message);
  };

  // Event handler for saving the edited message
  const handleSave = async () => {
    setMessage(editedMessage);
    setEditMode(false);

    try {
      // Update the message on the server
      const response = await fetch('/api/message', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: editedMessage}),
      });

      if (!response.ok) {
        throw new Error('Failed to update message');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Load the initial message from local storage
  useEffect(() => {
    const storedMessage = localStorage.getItem('contactMessage');
    if (storedMessage) {
      setMessage(storedMessage);
    }
  }, []);

  // Save the message to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('contactMessage', message);
  }, [message]);

  return (
    <div className="modal">
      <div className="modal-content">
        {/* Close button */}
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {/* Modal title */}
        <h2>Contact Us</h2>
        {/* Edit mode */}
        {editMode ? (
          <div>
            {/* Textarea for editing the message */}
            <textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
            ></textarea>
            {/* Save button */}
            <button className="saveBtn" onClick={handleSave}>
              Save
            </button>
          </div>
        ) : (
          // Display mode
          <p>{message}</p>
        )}
        {/* Render the Edit button only if the user is an admin */}
        {!editMode && isAdmin && (
          <button className="editBtn" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
