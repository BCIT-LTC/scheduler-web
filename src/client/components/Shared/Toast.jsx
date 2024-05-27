import { Box, Snackbar } from '@mui/material';
import { red, yellow } from '@mui/material/colors';
import { styled } from '@mui/system';

const CustomSnackbar = styled(Snackbar)(() => ({
  '& .MuiSnackbarContent-root': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 1,
  },
}));

const Toast = ({ open, handleClose, messages }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CustomSnackbar
        sx={{ width: '100%' }}
        onClick={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={300000}
        onClose={handleClose}
        message={messages.map((message, index) => (
          <p
            key={index}
            style={{
              color: red[700],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            {message}
          </p>
        ))}
        ContentProps={{
          style: { backgroundColor: yellow[100] },
          width: '100%',
        }}
      />
    </Box>
  );
};

export default Toast;
