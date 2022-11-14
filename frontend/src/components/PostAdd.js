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
import {
  conditionsList as conditions,
  substancesList as substances,
} from "../common/Lookups";

function PostAdd({ sessionManager }) {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  //const [substances, setSubstances] = useState([]);
  //const [conditions, setConditions] = useState([]);
  const [substancesSelection, setSubstancesSelection] = useState({});
  const [conditionsSelection, setConditionsSelection] = useState({});

  useEffect(() => {
    sessionManager.requireUser();
  });

  /*
  useEffect(() => {
    const getAttributes = async () => {
      const sub = await getSubstances();
      const cond = await getConditions();
      setSubstances(sub);
      setConditions(cond);
    };

    getAttributes();
  }, []);
*/

  const handleSubstancesSelection = (e) => {
    setSubstancesSelection((ss) => {
      const ssNew = { ...ss };
      ssNew[e.target.id] = e.target.checked;
      return ssNew;
    });
  };

  const handleConditionsSelection = (e) => {
    setConditionsSelection((cs) => {
      const csNew = { ...cs };
      csNew[e.target.id] = e.target.checked;
      return csNew;
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (title === "") {
      setMessage("Please add a title.");
      return;
    }

    try {
      await apiAddPost(
        url,
        title,
        desc,
        substancesSelection,
        conditionsSelection
      );
      setUrl("");
      setTitle("");
      setDesc("");
      setMessage("");
      setSubstancesSelection({});
      setConditionsSelection({});
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
                    key={substance.SubstanceID}
                    control={
                      <Checkbox
                        id={substance.SubstanceID.toString()}
                        checked={
                          substancesSelection[substance.SubstanceID] ===
                          undefined
                            ? false
                            : substancesSelection[substance.SubstanceID]
                        }
                        value={
                          substancesSelection[substance.SubstanceID] ===
                          undefined
                            ? false
                            : substancesSelection[substance.SubstanceID]
                        }
                        onChange={handleSubstancesSelection}
                        size="small"
                      />
                    }
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
                    key={condition.ConditionID}
                    control={
                      <Checkbox
                        id={condition.ConditionID.toString()}
                        checked={
                          conditionsSelection[condition.ConditionID] ===
                          undefined
                            ? false
                            : conditionsSelection[condition.ConditionID]
                        }
                        value={
                          conditionsSelection[condition.ConditionID] ===
                          undefined
                            ? false
                            : conditionsSelection[condition.ConditionID]
                        }
                        onChange={handleConditionsSelection}
                        size="small"
                      />
                    }
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
