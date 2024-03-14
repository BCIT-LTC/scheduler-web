import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
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


const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <fragment>
    <Button onClick={handleOpen}>Delete</Button>
      <Modal
        open={open}
        onCLose={handleClose}
      >
        <Box className="modal-content" sx={{...style, width: 200}}>
          <h2>Delete User</h2>
          <p>Are you sure you want to delete this user?</p>
          <Button variant="contained"onClick={onCancel}>Cancel</Button>
          <Button variant="outlined" color="error"onClick={onConfirm} className="delete">Confirm Delete</Button>
          <IconButton aria-label='close' onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
      </Modal>
    </fragment>
  );
};

export default DeleteConfirmationModal;
