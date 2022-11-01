import { useState, useEffect, useMemo, useCallback } from "react";

export default function Trial(props) {
  const [count, setCount] = useState();

  const submitForm = (e) => {};
  return (
    <div>
      <form onSubmit={submitForm}>
        <button type="submit">go</button>
      </form>
    </div>
  );
}
