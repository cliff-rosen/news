import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function SessionMessage({ sessionManager }) {
  return (
    <Snackbar
      open={sessionManager.showSnackbar}
      autoHideDuration={2000}
      onClose={() => sessionManager.setShowSnackbar(false)}
      severity="info"
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        {sessionManager.snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
