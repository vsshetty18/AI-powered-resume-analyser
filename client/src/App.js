import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://YOUR-BACKEND.onrender.com/analyze",
        formData
      );
      setResult(res.data);
    } catch (err) {
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI Resume Analyzer</h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        <button onClick={handleUpload} style={styles.button}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h2 style={styles.score}>
              Score: <span>{result.score}%</span>
            </h2>

            <div style={styles.section}>
              <h3>Matched Skills</h3>
              <p>{result.matchedSkills.join(", ") || "None"}</p>
            </div>

            <div style={styles.section}>
              <h3>Missing Skills</h3>
              <p>{result.missingSkills.join(", ")}</p>
            </div>

            <div style={styles.suggestion}>
              💡 {result.suggestions}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    marginBottom: "15px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#667eea",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultBox: {
    marginTop: "20px",
    textAlign: "left",
  },
  score: {
    textAlign: "center",
    color: "#764ba2",
  },
  section: {
    marginTop: "10px",
  },
  suggestion: {
    marginTop: "15px",
    padding: "10px",
    background: "#f3f4f6",
    borderRadius: "6px",
  },
};

export default App;
