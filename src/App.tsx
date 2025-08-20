import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DisplayButton from "./DisplayButton";

function App() {
  const [count, setCount] = useState(0);

  return <DisplayButton count={count} setCount={setCount} />;
}

export default App;
