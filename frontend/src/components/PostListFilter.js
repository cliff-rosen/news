import { useState, useEffect } from "react";
import {
  conditionsList as conditions,
  substancesList as substances,
} from "../common/Lookups";
import { getEntryTypes } from "../common/LookupAPI";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

export default function PostListFilter({ applyFilter, hideFilter }) {
  const [entryTypes, setEntryTypes] = useState([]);
  const [entryTypeID, setEntryTypeID] = useState("");
  const [substancesSelection, setSubstancesSelection] = useState({});
  const [conditionsSelection, setConditionsSelection] = useState({});

  useEffect(() => {
    const getLookups = async () => {
      const et = await getEntryTypes();
      setEntryTypes(et);
    };

    getLookups();
  }, []);

  const clearFilter = () => {
    setEntryTypeID("");
    setSubstancesSelection({});
    setConditionsSelection({});
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

  return (
    <Container
      maxWidth="xs"
      style={{
        backgroundColor: "#eeeeee",
        border: "none",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <Box component="form" sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel>Post Type</InputLabel>
          <Select
            value={entryTypeID}
            label="Post Type"
            onChange={(e) => {
              setEntryTypeID(e.target.value);
            }}
          >
            <MenuItem key={0} value={""}>
              -
            </MenuItem>
            {entryTypes.map((et) => (
              <MenuItem key={et.EntryTypeID} value={et.EntryTypeID}>
                {et.EntryTypeName}
              </MenuItem>
            ))}
          </Select>

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
                        substancesSelection[substance.SubstanceID] === undefined
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
                        conditionsSelection[condition.ConditionID] === undefined
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
        </FormControl>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={hideFilter}
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
          >
            cancel
          </Button>
          <Button
            onClick={clearFilter}
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
          >
            clear
          </Button>
          <Button
            onClick={() =>
              applyFilter(entryTypeID, substancesSelection, conditionsSelection)
            }
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
          >
            apply filter
          </Button>
          <Button
            onClick={hideFilter}
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
          >
            hide filter
          </Button>
        </div>
      </Box>
    </Container>
  );
}
