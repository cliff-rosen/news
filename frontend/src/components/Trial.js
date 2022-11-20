import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  writeFilterParamsToLocalStorage,
  readFilterFromLocalStorage,
  isFilterStored,
} from "../common/FilterUtils";

export default function Trial() {
  const [a, setA] = useState(1);
  var x = 1;

  console.log("rendering");

  useEffect(() => {
    console.log("useEffect");
    x++;
    setA(a + 1);
  }, []);

  return (
    <div>
      hello {x}
      {a}
    </div>
  );
}
