import { Close } from "@mui/icons-material";
import { Box, IconButton, Snackbar } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { styled } from "@mui/system";

const CustomSnackbar = styled(Snackbar)(() => ({
"& .MuiSnackbarContent-root": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%"
}
}));

const Notification = ({ open, handleClose, messages, type }) => {
const backgroundColor = type === "success" ? green[100] : red[100];
const textColor = type === "success" ? green[700] : red[700];

const handleIconButtonClick = (event) => {
event.stopPropagation();
handleClose(true); // Pass true to indicate close by icon
};

return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
    <CustomSnackbar
        sx={{ width: "100%" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        message={messages.map((message, index) => (
        <p
            key={index}
            style={{
            color: textColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "100%"
            }}
        >
            {message}
        </p>
        ))}
        action={
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleIconButtonClick}
        >
            <Close fontSize="small" />
        </IconButton>
        }
        ContentProps={{
          style: { backgroundColor: backgroundColor },
          width: "100%"
        }}
      />
    </Box>
  );
};

export default Notification;
