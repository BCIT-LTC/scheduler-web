import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteConfirmationModal from './DeleteConfirmation';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box';

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
const EditMultiModal = ({ isOpen, onClose, onSave}) => {
  const [role, setRole] = useState('User');
  
  const handleClose = () => {
    onClose();
  };
  const handleSave = () => {
    onSave({role});
    onClose();
  };




  return (
    <Modal
      open = {isOpen}
      onCLose = {handleClose}>
      <Box className="modal-content" sx = {{ ...style, width:400}}>
      <IconButton aria-label='close' onClick={handleClose}><CloseIcon /></IconButton>
        <h2>Edit Multiple Users</h2>
        <h3>Update Role</h3>
        <p>All Selected users will be updated with the role chosen.</p>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <Button variant="contained" onClick={handleSave}>Update</Button>
        <h3>Delete Users</h3>
        <p>All selected users will be removed from the system</p>
        <DeleteConfirmationModal />
      </Box>
    </Modal>
  );
};

export default EditMultiModal;
