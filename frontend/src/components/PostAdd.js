import { useState, useEffect } from "react";
import { addPost as apiAddPost } from "../common/PostAPI";
import {
  conditionsList as conditions,
  substancesList as substances,
} from "../common/Lookups";
import { getEntryTypes } from "../common/LookupAPI";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { TextField, Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function PostAdd({ sessionManager }) {
  const [entryTypes, setEntryTypes] = useState([]);
  const [entryTypeID, setEntryTypeID] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [substancesSelection, setSubstancesSelection] = useState({});
  const [conditionsSelection, setConditionsSelection] = useState({});

  useEffect(() => {
    sessionManager.requireUser();
  });

  useEffect(() => {
    const getLookups = async () => {
      const et = await getEntryTypes();
      setEntryTypes(et);
    };

    getLookups();
  }, []);

  const isLinkRequired = () => {
    if (entryTypeID === "") return false;
    return Boolean(
      entryTypes.find((e) => e.EntryTypeID === entryTypeID).RequiresLink
    );
  };

  const getURLLabel = () => {
    if (entryTypeID === 0) return "";
    const URLLabel =
      entryTypes.find((e) => e.EntryTypeID === entryTypeID).EntryTypeName +
      " URL";
    return URLLabel;
  };

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

    if (entryTypeID === "") {
      setMessage("Please select a post type.");
      return;
    }

    if (title === "") {
      setMessage("Please add a title.");
      return;
    }

    try {
      await apiAddPost(
        entryTypeID,
        url,
        title,
        desc,
        substancesSelection,
        conditionsSelection
      );
      setEntryTypeID("");
      setTitle("");
      setUrl("");
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
      <div style={{ margin: "20px" }}></div>
      <Container maxWidth="xs">
        {message && (
          <div>
            <Alert severity="error">{message}</Alert>
            <br />
          </div>
        )}
        <Box component="form" onSubmit={formSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Post Type</InputLabel>
            <Select
              value={entryTypeID}
              label="Post Type"
              onChange={(e) => {
                setEntryTypeID(e.target.value);
                setMessage("");
              }}
            >
              {entryTypes.map((et) => (
                <MenuItem key={et.EntryTypeID} value={et.EntryTypeID}>
                  {et.EntryTypeName}
                </MenuItem>
              ))}
            </Select>
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
            {isLinkRequired() && (
              <span>
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  id="url"
                  type="text"
                  label={getURLLabel()}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  variant="outlined"
                />
                <br />
              </span>
            )}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "none",
              }}
            >
              <FormGroup>
                <FormLabel>SUBSTANCES</FormLabel>
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
                        onChange={handleSubstancesSelection}
                        size="small"
                      />
                    }
                    label={substance.SubstanceName}
                  />
                ))}
              </FormGroup>
              <FormGroup>
                <FormLabel>CONDITIONS</FormLabel>
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
                        onChange={handleConditionsSelection}
                        size="small"
                      />
                    }
                    label={condition.ConditionName}
                  />
                ))}
              </FormGroup>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              post
            </Button>
          </FormControl>
        </Box>
      </Container>
    </div>
  );
}

export default PostAdd;
