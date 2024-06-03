import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const DeleteConfirmationModal = ({
  isOpen,
  onCancel,
  onDeleteSeries,
  onDeleteEvent,
  children,
  isSeries,
  setOnSuccess,
  setToastType,
  setToastMessages,
  setShowToast,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Delete
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-content" sx={{ ...style, width: 200 }}>
          {children}
          <Box gap={2} sx={{ display: "flex", flexDirection: "column" }}>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            {isSeries && (
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  try {
                    await onDeleteSeries();
                    setOnSuccess(true);
                    setToastType("success");
                    setToastMessages(["Series deleted successfully"]);
                  } catch (error) {
                    setToastType("error");
                    setToastMessages([error.message]);
                  } finally {
                    setShowToast(true);
                    setOpen(false);
                  }
                }}
                className="delete"
              >
                Delete Series
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              onClick={async () => {
                try {
                  await onDeleteEvent();
                  setOnSuccess(true);
                  setToastType("success");
                  setToastMessages(["Event deleted successfully"]);
                } catch (error) {
                  setToastType("error");
                  setToastMessages([error.message]);
                } finally {
                  setOpen(false);
                  onCancel();
                }
              }}
              className="delete"
            >
              Delete Event Only
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;
