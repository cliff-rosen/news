import { useState } from "react";

const d1 = [];
const d2 = [];
for (let i = 0; i < 40; i++) {
  d1.push([i, i]);
  d2.push([i, i * i]);
}

export function Trial() {
  const [d, setD] = useState(d1);

  return (
    <div>
      {d.map((e) => (
        <div key={e[0]}>{e[0] + ":" + e[1]}</div>
      ))}
      <button onClick={() => setD(d2)}>now</button>
    </div>
  );
}
