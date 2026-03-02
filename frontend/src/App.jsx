import React, { useState } from "react";
import "./App.css";
import ContentForm from "./components/ContentForm.jsx";
import OutputDisplay from "./components/OutputDisplay";

function App() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <h1>Social Media Post Generator</h1>
      <ContentForm setOutput={setOutput} setLoading={setLoading} />
      <OutputDisplay output={output} loading={loading} />
    </div>
  );
}

export default App;
