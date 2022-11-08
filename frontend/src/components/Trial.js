import { useState } from "react";

function X() {
  console.log("X");
  return <div>X</div>;
}

export default function Trial(props) {
  const [count, setCount] = useState(0);

  const submitForm = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };
  return (
    <div>
      count: {count}
      <form onSubmit={submitForm}>
        <button type="submit">go</button>
      </form>
      <X />
    </div>
  );
}
