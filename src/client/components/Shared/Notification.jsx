import { Close } from "@mui/icons-material";
import { Box, IconButton, Snackbar, Button } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { styled } from "@mui/system";

const CustomSnackbar = styled(Snackbar)(() => ({
  "& .MuiSnackbarContent-root": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
}));

const Notification = ({
  open,
  handleClose,
  action,
  actionText,
  messages,
  type,
}) => {
  const backgroundColor = type === "success" ? green[100] : red[100];
  const textColor = type === "success" ? green[700] : red[700];

  const handleIconButtonClick = (event) => {
    event.stopPropagation();
    handleClose(true); // Pass true to indicate close by icon
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CustomSnackbar
        sx={{ display: "flex", justifyContent: "flex-start" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        message={messages.map((message, index) => (
          <p
            key={index}
            style={{
              color: textColor,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "start",
              width: "100%",
            }}
          >
            {message}
          </p>
        ))}
        action={
          <>
            {type === "success" && actionText && action && (
              <Button variant="text" onClick={action}>
                {actionText}
              </Button>
            )}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleIconButtonClick}
            >
              {type !== "success" && <Close fontSize="small" />}
            </IconButton>
          </>
        }
        ContentProps={{
          style: { backgroundColor: backgroundColor },
          width: "100%",
        }}
      />
    </Box>
  );
};

export default Notification;
