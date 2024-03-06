import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Icon from '@mui/material/Icon';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', 
  justifyContent: 'space-around',
  textalign: 'center',
  gap: 2
};

const privacy_style = {
    position: 'relative',
    width: '70%',
    pt: 1,
    pl: 6.5,
    pr: 1,
    pb: 1,
    color: '#1e4620',
    bgcolor: '#edf7ed',
    borderRadius: 1,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="inversePrimary" onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 1, pl: "2em" }}>
                This is the Experiential Learning Team's communication and scheduling app.
            </Typography>
            <Box sx={privacy_style}>
                <Icon sx={{position: 'absolute', top: 0, left: 0, p: 2}}><CheckCircleOutlineIcon sx={{ color: 'green'}} /></Icon>
                <Typography variant="h6" sx={{pt: 1}}>
                    Privacy statement
                </Typography>
                <Typography>
                    <p>This service has passed Privacy Impact Assessment BCIT-A29, and complies with BCIT policies 3501 and 3502.</p>

                    <p>For more information, please contact the BCIT Privacy Office.</p>

                    <p><strong>Email: </strong>privacy@bcit.ca</p>
                    <p><strong>Phone: </strong>604-454-2044</p>
                </Typography>
            </Box>
            <form className="form" action="/auth/login" method="post">
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}