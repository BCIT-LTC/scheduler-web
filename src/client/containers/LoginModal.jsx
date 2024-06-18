import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Icon from '@mui/material/Icon';
import Link from '@mui/material/Link';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '70%', 
    sm: 400,
    md: 400,
  },
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

// Privacy statement style
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

/**
 * Login button that opens a modal with the privacy statement and a button for SAML login.
 * @returns {JSX.Element} - LoginModal
 */
export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#fff', color: (theme) => theme.palette.primary.main }}>Login</Button>
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
                <p>This service has passed {" "}
                  <Link href="https://www.bcit.ca/information-access-privacy/" target="_blank" rel="noopener" underline="none">Privacy Impact Assessment BCIT-A29</Link>,
                   and complies with BCIT policies {" "}
                  <Link href="https://www.bcit.ca/files/pdf/policies/3501.pdf" target="_blank" rel="noopener" underline="none">3501</Link> and {" "}
                  <Link href="https://www.bcit.ca/files/pdf/policies/3502.pdf" target="_blank" rel="noopener" underline="none">3502</Link>.
                </p>

                <p>For more information, please contact the BCIT Privacy Office.</p>

                <p><strong>Email: </strong>privacy@bcit.ca</p>
                <p><strong>Phone: </strong>604-454-2044</p>
            </Box>
            <form className="form" action="/auth/login" method="post">
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}