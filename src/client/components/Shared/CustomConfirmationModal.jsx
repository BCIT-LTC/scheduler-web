import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';

function CustomConfirmationModal(props) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(true);

  const renderDialogActions = (dialogButtons) => {
    return dialogButtons.map((button, index) => (
      <Button
        // if button.onclick is defined, then set onclick to button.onclick, else set onclick to () => setIsConfirmationOpen(false)
        onClick={button.onClick ? button.onClick : () => setIsConfirmationOpen(false)}
        form={button.form}
        color={button.color}
        variant={button.variant}
        type={button.type}
        key={index}
      >
        {button.label}
      </Button>
    ));
  };


  return (
    <>
      <Dialog
        open={props.open && isConfirmationOpen}
        onClose={() => {
          props.handleClose();
          setIsConfirmationOpen(true);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogConfig.title}</DialogTitle>
        {props.isLoading ? (
          <DialogContent>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress style={{ color: '#1976d2', width: '100px', height: '100px' }} />
            </div>
          </DialogContent>
        ) : (
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {props.dialogConfig.content}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {renderDialogActions(props.dialogConfig.buttons)}
            </DialogActions>
          </>
        )}
      </Dialog>
      {props.isSuccessful && (
        <Dialog
          open={!!props.isSuccessful}
          onClose={() => {
            setIsConfirmationOpen(true);
            if (props.isSuccessful) {
              props.successDialogConfig.onClose();
            } else {
              props.failureDialogConfig.onClose();
            }
          }}
        >
          <DialogTitle>
            {props.isSuccessful ? props.successDialogConfig.title : props.failureDialogConfig.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.isSuccessful ? props.successDialogConfig.content : props.failureDialogConfig.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {props.isSuccessful
              ? renderDialogActions(props.successDialogConfig.buttons)
              : renderDialogActions(props.failureDialogConfig.buttons)}
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default CustomConfirmationModal;