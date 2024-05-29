import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <>
      <Button
        onClick={onSave}
        type="submit"
        variant="contained"
        color="primary"
        size="normal"
      >
        {buttonText}
      </Button>
      <Modal open={isOpen} onClose={handleClose}>
        <Box className="modal-content" sx={{ ...style, width: 200 }}>
          <h2>Confirm Event</h2>
          <p>Event saved!</p>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default EventConfirmationModal;
