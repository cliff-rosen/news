import { useState, useEffect, useMemo } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { entryTypeMap, substancesMap, conditionsMap } from "./Lookups";

export function useFilterQueryParams() {
  const { search } = useLocation();
  const getQueryParams = useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);

  const order = getQueryParams.get("order") || "trending";
  const start = Number(getQueryParams.get("start")) || 0;
  const entryTypeIDs = getQueryParams.get("entrytypeids") || "";
  const substanceIDs = getQueryParams.get("substanceids") || "";
  const conditionIDs = getQueryParams.get("conditionids") || "";

  return { order, start, entryTypeIDs, substanceIDs, conditionIDs };
}

export function writeFilterObjectToLocalStorage(filter) {
  localStorage.setItem("listFilter", JSON.stringify(filter));
}

export function writeFilterParamsToLocalStorage(
  order,
  start,
  entryTypeIDs,
  substanceIDs,
  conditionIDs
) {
  const filter = { order, start, entryTypeIDs, substanceIDs, conditionIDs };
  writeFilterObjectToLocalStorage(filter);
}

export function readFilterFromLocalStorage() {
  const filter = JSON.parse(localStorage.getItem("listFilter"));
  return filter || {};
}

export function isFilterStored() {
  const filter = readFilterFromLocalStorage();
  if (filter.entryTypeIDs || filter.substanceIDs || filter.conditionIDs) {
    return true;
  }
  return false;
}

export function getStoredFilterURL(start) {
  start = start || 0;
  const { order, dummyStart, entryTypeIDs, substanceIDs, conditionIDs } =
    readFilterFromLocalStorage();
  return `/postlist?order=${order}&start=${start}&entrytypeids=${entryTypeIDs}&substanceids=${substanceIDs}&conditionids=${conditionIDs}`;
}

export function getStoredFilterText() {
  if (!isFilterStored()) {
    return "";
  }

  var entryTypesText = "";
  var substancesText = "";
  var conditionsText = "";

  const { order, start, entryTypeIDs, substanceIDs, conditionIDs } =
    readFilterFromLocalStorage();

  if (entryTypeIDs) {
    entryTypesText = entryTypeIDs
      .split(",")
      .map((etid) => entryTypeMap[etid])
      .join(", ");
    entryTypesText = "POST TYPES: " + entryTypesText;
  }

  if (substanceIDs) {
    substancesText = substanceIDs
      .split(",")
      .map((s) => substancesMap[s])
      .join(", ");
    substancesText = "SUBSTANCES: " + substancesText;
  }

  if (conditionIDs) {
    conditionsText = conditionIDs
      .split(",")
      .map((c) => conditionsMap[c])
      .join(", ");
    conditionsText = "CONDITIONS: " + conditionsText;
  }

  var filterText = entryTypesText;
  if (substancesText) {
    filterText += filterText ? ", " : "";
    filterText += substancesText;
  }
  if (conditionsText) {
    filterText += filterText ? ", " : "";
    filterText += conditionsText;
  }
  return filterText;
}
