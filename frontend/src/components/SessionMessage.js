import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function SessionMessage({ sessionManager }) {
  return (
    <Snackbar
      open={sessionManager.showSessionMessage}
      autoHideDuration={3000}
      onClose={() => sessionManager.setShowSessionMessage(false)}
      severity="info"
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        {sessionManager.sessionMessage}
      </Alert>
    </Snackbar>
  );
}
