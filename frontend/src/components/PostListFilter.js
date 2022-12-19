import { useState, useEffect } from "react";
import {
  entryTypesList,
  conditionsList,
  substancesList,
} from "../utils/Lookups";
import { makeSelectionObject } from "../utils/FilterUtils";
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

export default function PostListFilter({
  applyFilter,
  hideFilter,
  selections,
}) {
  const [substancesSelection, setSubstancesSelection] = useState({});
  const [conditionsSelection, setConditionsSelection] = useState({});
  const [entryTypesSelection, setEntryTypesSelection] = useState({});

  useEffect(() => {
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
      style={{
        backgroundColor: "#eeeeee",
        border: "none",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <Box component="form">
        <FormControl fullWidth>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <FormGroup style={{ width: "33%" }}>
              <FormLabel>POST TYPE</FormLabel>
              {entryTypesList.map((et) => (
                <FormControlLabel
                  key={entryTypesList.EntryTypeID}
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
            <FormGroup style={{ width: "33%" }}>
              <FormLabel>SUBSTANCES</FormLabel>
              {substancesList.map((substance) => (
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
            <FormGroup style={{ width: "33%" }}>
              <FormLabel>CONDITIONS</FormLabel>
              {conditionsList.map((condition) => (
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
            close
          </Button>
        </div>
      </Box>
    </Container>
  );
}
