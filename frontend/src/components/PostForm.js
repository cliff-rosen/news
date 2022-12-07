import { useState, useEffect, useRef } from "react";
import { addPost as apiAddPost, getPostByUrl } from "../utils/PostAPI";
import {
  entryTypesList,
  conditionsList,
  substancesList,
} from "../utils/Lookups";
import PostAddDupeUrlMessage from "./PostAddDupeUrlMessage";
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

export default function Post({ sessionManager }) {
  const [entryTypeID, setEntryTypeID] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");
  const [dupeUrlErrorPostID, setDupeUrlErrorPostID] = useState(0);
  const [substancesSelection, setSubstancesSelection] = useState({});
  const [conditionsSelection, setConditionsSelection] = useState({});
  const urlRef = useRef(null);

  useEffect(() => {
    sessionManager.requireUser();
  }, [sessionManager.user.userID]);

  const isLinkRequired = () => {
    if (entryTypeID === "") return false;
    return Boolean(
      entryTypesList.find((e) => e.EntryTypeID === entryTypeID).RequiresLink
    );
  };

  const getURLLabel = () => {
    if (entryTypeID === 0) return "";
    const URLLabel =
      entryTypesList.find((e) => e.EntryTypeID === entryTypeID).EntryTypeName +
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

  const checkForDuplicateUrl = async (e) => {
    if (url === "") {
      setDupeUrlErrorPostID(0);
      return;
    }
    const existingEntry = await getPostByUrl(url);
    if (existingEntry.EntryID) {
      setDupeUrlErrorPostID(existingEntry.EntryID);
      urlRef.current.focus();
    } else {
      setDupeUrlErrorPostID(0);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (dupeUrlErrorPostID > 0) {
      console.log(
        "Cannot submit form with duplicate URL: ",
        dupeUrlErrorPostID
      );
      return;
    }

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
    <Container>
      <div style={{ margin: "20px" }}></div>
      {dupeUrlErrorPostID > 0 && (
        <PostAddDupeUrlMessage postID={dupeUrlErrorPostID} />
      )}
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
            {entryTypesList.map((et) => (
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
                inputRef={urlRef}
                type="text"
                label={getURLLabel()}
                value={url}
                onChange={(e) => setUrl(e.target.value.trim())}
                onBlur={(e) => checkForDuplicateUrl(e)}
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
          <Container
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "none",
              maxWidth: "70%",
            }}
          >
            <FormGroup>
              <FormLabel>SUBSTANCES</FormLabel>
              {substancesList.map((substanceItem) => (
                <FormControlLabel
                  key={substanceItem.SubstanceID}
                  control={
                    <Checkbox
                      id={substanceItem.SubstanceID.toString()}
                      checked={
                        substancesSelection[substanceItem.SubstanceID] ===
                        undefined
                          ? false
                          : substancesSelection[substanceItem.SubstanceID]
                      }
                      onChange={handleSubstancesSelection}
                      size="small"
                    />
                  }
                  label={substanceItem.SubstanceName}
                />
              ))}
            </FormGroup>
            <FormGroup>
              <FormLabel>CONDITIONS</FormLabel>
              {conditionsList.map((conditionItem) => (
                <FormControlLabel
                  key={conditionItem.ConditionID}
                  control={
                    <Checkbox
                      id={conditionItem.ConditionID.toString()}
                      checked={
                        conditionsSelection[conditionItem.ConditionID] ===
                        undefined
                          ? false
                          : conditionsSelection[conditionItem.ConditionID]
                      }
                      onChange={handleConditionsSelection}
                      size="small"
                    />
                  }
                  label={conditionItem.ConditionName}
                />
              ))}
            </FormGroup>
          </Container>
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
  );
}
