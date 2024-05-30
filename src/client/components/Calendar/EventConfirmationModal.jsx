import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Notification from '../Shared/Notification';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const EventConfirmationModal = ({ isOpen, onCancel, onSave, buttonText }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessages, setAlertMessages] = useState([]);
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await onSave();
      setAlertType('success');
      setAlertMessages(['Event saved successfully!']);
      setAlertOpen(true);
    } catch (error) {
      setAlertType('error');
      setAlertMessages(['Failed to save event.']);
      setAlertOpen(true);
    }
  };

  const handleAlertClose = (closedByIcon) => {
    setAlertOpen(false);
    if (alertType === 'success' && !closedByIcon) {
      navigate('/calendar'); // Redirect to calendar page on success
    }
  };

  return (
    <>
      <Button
        onClick={handleSave}
        type="submit"
        variant="contained"
        color="primary"
        size="normal"
      >
        {buttonText}
      </Button>
      <Modal open={isOpen} onClose={onCancel}>
        <Box className="modal-content" sx={{ ...style, width: 200 }}>
          <h2>Confirm Event</h2>
          <p>Event saved!</p>
          <Button variant="contained" onClick={onCancel}>
            Close
          </Button>
        </Box>
      </Modal>
      <Notification
        open={alertOpen}
        handleClose={handleAlertClose}
        messages={alertMessages}
        type={alertType}
      />
    </>
  );
};

export default EventConfirmationModal;