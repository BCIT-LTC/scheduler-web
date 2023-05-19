import React, {useState} from 'react';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const ContactUs = () => {
  const [message, setMessage] = useState(
    'For any questions related to the Open Lab Application or general use of Open Lab, please contact jasica_munday@BCIT.ca. For any other inquiries (e.g. clinical skills) please contact your clinical instructor.'
  );
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);
  const user = jwtDecode(Cookies.get('jwt'));
  const isAdmin = user.isAdmin;
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setEditMode(true);
    setEditedMessage(message);
    setShowModal(true);
  };

  const handleSave = () => {
    setMessage(editedMessage);
    setEditMode(false);
    setShowModal(false);
  };

  const handleContactUsClick = () => {
    if (isAdmin) {
      handleEdit();
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="container">
      <h1>Contact Us</h1>
      <button className="button" onClick={handleContactUsClick}>
        <img src="./info-icon.png" alt="" />
        Contact Us
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            {editMode ? (
              <div>
                <textarea
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                ></textarea>
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <p>{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
