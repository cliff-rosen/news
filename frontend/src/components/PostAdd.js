import { useState, useEffect } from "react";
import { addPost as apiAddPost } from "../common/PostAPI";
import { getSubstances, getConditions } from "../common/AttributeAPI";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

function PostAdd({ sessionManager }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [substances, setSubstances] = useState([]);
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    sessionManager.requireUser();
  });

  useEffect(() => {
    const getAttributes = async () => {
      setSubstances(await getSubstances());
      setConditions(await getConditions());
    };

    getAttributes();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();

    if (title === "") {
      setMessage("Please add a title.");
      return;
    }

    try {
      await apiAddPost(url, title, desc);
      setUrl("");
      setTitle("");
      setDesc("");
      sessionManager.setSessionMessageWrapper("Entry submitted");
    } catch (e) {
      console.log("error adding post", e);
      setMessage("Doh! An unexpected error occurred.  Please try again.");
    }
  };
  return (
    <div>
      <div>
        {message && (
          <div>
            <Alert severity="error">{message}</Alert>
            <br />
          </div>
        )}
      </div>
      <div style={{ margin: "20px" }}></div>
      <Container maxWidth="xs">
        <Box component="form" onSubmit={formSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="url"
            autoFocus
            type="text"
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
          />
          <br />
          <TextField
            margin="normal"
            fullWidth
            id="title"
            type="text"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            required
          />
          <br />
          <TextField
            margin="normal"
            fullWidth
            id="desc"
            multiline
            rows={4}
            type="text"
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            variant="outlined"
          />
          <br />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "none",
            }}
          >
            <div>
              <FormLabel>SUBSTANCES</FormLabel>
              <FormGroup>
                {substances.map((substance) => (
                  <FormControlLabel
                    id={substance.SubstanceID}
                    control={<Checkbox />}
                    label={substance.SubstanceName}
                  />
                ))}
              </FormGroup>
            </div>
            <div>
              <FormLabel>CONDITIONS</FormLabel>
              <FormGroup>
                {conditions.map((condition) => (
                  <FormControlLabel
                    id={condition.ConditionID}
                    control={<Checkbox />}
                    label={condition.ConditionName}
                  />
                ))}
              </FormGroup>
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            post
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default PostAdd;
