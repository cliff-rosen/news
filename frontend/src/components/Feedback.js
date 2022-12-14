import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { addFeedback } from "../utils/PostAPI";

export default function Feedback() {
  const [feedbackText, setFeedbackText] = useState("");
  const [message, setMessage] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      await addFeedback(feedbackText);
      setFeedbackText("");
      setMessage("Thanks for the feedback!");
    } catch (e) {
      console.log("error adding post", e);
      setMessage("Doh! An unexpected error occurred.  Please try again.");
    }
  };

  return (
    <div style={{}}>
      <br />
      {message}
      <form onSubmit={formSubmit}>
        <TextField
          margin="normal"
          fullWidth
          id="feedbackText"
          type="text"
          label="Please type your feedback here"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          variant="outlined"
          multiline
          rows={5}
          required
          onFocus={() => setMessage("")}
        />
        <br />
        <Button type="submit" variant="contained" color="primary">
          submit
        </Button>
      </form>
    </div>
  );
}
