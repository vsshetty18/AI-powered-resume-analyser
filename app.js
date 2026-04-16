import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Upload a file");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "https://YOUR-BACKEND.onrender.com/analyze",
        formData
      );
      setResult(res.data);
    } catch (err) {
      alert("Error analyzing resume");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>AI Resume Analyzer</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <br /><br />

      <button onClick={handleUpload}>Analyze</button>

      {result && (
        <div>
          <h3>Score: {result.score}%</h3>
          <p>Matched: {result.matchedSkills.join(", ")}</p>
          <p>Missing: {result.missingSkills.join(", ")}</p>
          <p>{result.suggestions}</p>
        </div>
      )}
    </div>
  );
}

export default App;
