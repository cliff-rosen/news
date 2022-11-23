import { useState, useEffect } from "react";
import {
  entryTypeList as entryTypes,
  conditionsList as conditions,
  substancesList as substances,
} from "../common/Lookups";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const makeSelectionObject = (selectionList) => {
  if (!selectionList) {
    return {};
  }
  const selectionArr = selectionList.split(",");
  const selObj = selectionArr.reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {});
  return selObj;
};

export default function PostListFilter({
  applyFilter,
  hideFilter,
  selections,
}) {
  const [substancesSelection, setSubstancesSelection] = useState({});
  const [conditionsSelection, setConditionsSelection] = useState({});
  const [entryTypesSelection, setEntryTypesSelection] = useState({});

  useEffect(() => {
    console.log("effect", selections.entryTypeIDs);
    setSubstancesSelection(makeSelectionObject(selections.substanceIDs));
    setConditionsSelection(makeSelectionObject(selections.conditionIDs));
    setEntryTypesSelection(makeSelectionObject(selections.entryTypeIDs));
  }, [selections]);

  const clearFilter = () => {
    setEntryTypesSelection({});
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

  const handleEntryTypesSelection = (e) => {
    setEntryTypesSelection((es) => {
      const esNew = { ...es };
      esNew[e.target.id] = e.target.checked;
      return esNew;
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "none",
            }}
          >
            <FormGroup>
              <FormLabel>POST TYPE</FormLabel>
              {entryTypes.map((et) => (
                <FormControlLabel
                  key={entryTypes.EntryTypeID}
                  label={
                    <Typography style={{ fontSize: 12 }} color="textSecondary">
                      {et.EntryTypeName}
                    </Typography>
                  }
                  control={
                    <Checkbox
                      id={et.EntryTypeID.toString()}
                      checked={
                        entryTypesSelection[et.EntryTypeID] === undefined
                          ? false
                          : entryTypesSelection[et.EntryTypeID]
                      }
                      onChange={handleEntryTypesSelection}
                      size="small"
                    />
                  }
                />
              ))}
            </FormGroup>
            <FormGroup>
              <FormLabel>SUBSTANCES</FormLabel>
              {substances.map((substance) => (
                <FormControlLabel
                  key={substance.SubstanceID}
                  label={
                    <Typography style={{ fontSize: 12 }} color="textSecondary">
                      {substance.SubstanceName}
                    </Typography>
                  }
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
                />
              ))}
            </FormGroup>
            <FormGroup>
              <FormLabel>CONDITIONS</FormLabel>
              {conditions.map((condition) => (
                <FormControlLabel
                  style={{ border: "none" }}
                  key={condition.ConditionID}
                  label={
                    <Typography style={{ fontSize: 12 }} color="textSecondary">
                      {condition.ConditionName}
                    </Typography>
                  }
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
              applyFilter(
                entryTypesSelection,
                substancesSelection,
                conditionsSelection
              )
            }
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
          >
            apply
          </Button>
          <Button
            onClick={hideFilter}
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
          >
            hide
          </Button>
        </div>
      </Box>
    </Container>
  );
}
