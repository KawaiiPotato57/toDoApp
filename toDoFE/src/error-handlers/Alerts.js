import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Alerts(open, handleAlertClose, alertSeverity, alertMessage) {
  return () => {
    return (
      <div>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleAlertClose}>
          <Alert
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    );
  };
}
export default Alerts;