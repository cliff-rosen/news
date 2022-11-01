import { useState, useEffect, useMemo, useCallback } from "react";

export default function Trial(props) {
  const [count, setCount] = useState();

  const submitForm = (e) => {
    console.log("submitForm start");
    e.preventDefault();
    if (e.x) e.x();
    console.log("submitForm finish");
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <button type="submit">go</button>
      </form>
    </div>
  );
}
