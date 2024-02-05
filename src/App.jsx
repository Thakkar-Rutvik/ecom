import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Router from "./Router/Router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
