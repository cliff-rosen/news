import { fetchGet } from "./APIUtils";

export const getSubstances = async () => {
  var res;
  try {
    res = await fetchGet("attribute/substance");
    console.log(res);
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
    console.log(res);
    return res;
  } catch (e) {
    console.log("getSubstances error: ", e.message);
    throw new Error("UNKNOWN_ERROR");
  }
};
