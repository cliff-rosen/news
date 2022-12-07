import { fetchGet } from "./APIUtils";

export const getEntryTypes = async () => {
  var res;
  try {
    res = await fetchGet("entries/types");
    return res;
  } catch (e) {
    console.log("getEntryTypes error: ", e.message);
    throw new Error("UNKNOWN_ERROR");
  }
};

export const getSubstances = async () => {
  var res;
  try {
    res = await fetchGet("attribute/substance");
    return res;
  } catch (e) {
    console.log("getSubstances error: ", e.message);
    throw new Error("UNKNOWN_ERROR");
  }
};

export const getConditions = async () => {
  var res;
  try {
    res = await fetchGet("attribute/condition");
    return res;
  } catch (e) {
    console.log("getSubstances error: ", e.message);
    throw new Error("UNKNOWN_ERROR");
  }
};
