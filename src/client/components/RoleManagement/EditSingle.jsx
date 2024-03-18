import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteConfirmationModal from './DeleteConfirmation';
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

const EditUserModal = ({ isOpen, onClose, onSave}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleClose = () => {
    onClose()
  };

  const handleSave = () => {
    onSave({ firstName, lastName, email, role });
    onClose();
  };




  return (
    <Modal
    open={isOpen}
    onClose={handleClose}>
      <Box className="modal-content" sx={{ ...style, width: 400}}>
        <h2>Edit User</h2>
        <IconButton aria-label='close' onClick={handleClose}><CloseIcon /></IconButton>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Admin">Admin</option>
            <option value="Instructor">Instructor</option>
          </select>
        </label>
        <Button variant="contained" onClick={handleSave}>Save</Button>
        <DeleteConfirmationModal />
      </Box>
      </Modal>

  );
};

export default EditUserModal;
