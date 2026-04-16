import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Upload a resume");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://ai-powered-resume-analyser-2.onrender.com/analyze",
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
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>🚀 AI Resume Analyzer</h1>

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
            <h2 style={styles.scoreText}>Score: {result.score}%</h2>

            {/* Progress Bar */}
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${result.score}%`,
                }}
              ></div>
            </div>

            {/* Matched Skills */}
            <div style={styles.section}>
              <h3>Matched Skills</h3>
              <div style={styles.tags}>
                {result.matchedSkills.map((skill, i) => (
                  <span key={i} style={styles.tagGreen}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div style={styles.section}>
              <h3>Missing Skills</h3>
              <div style={styles.tags}>
                {result.missingSkills.map((skill, i) => (
                  <span key={i} style={styles.tagRed}>
                    {skill}
                  </span>
                ))}
              </div>
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
    background:
      "linear-gradient(270deg, #667eea, #764ba2, #6a11cb, #2575fc)",
    backgroundSize: "800% 800%",
    animation: "gradient 15s ease infinite",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Poppins, sans-serif",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backdropFilter: "blur(50px)",
  },

  card: {
    position: "relative",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(20px)",
    padding: "30px",
    borderRadius: "16px",
    width: "420px",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  },

  title: {
    marginBottom: "20px",
  },

  input: {
    marginBottom: "15px",
    color: "#fff",
  },

  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#00c6ff",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },

  resultBox: {
    marginTop: "20px",
    textAlign: "left",
  },

  scoreText: {
    textAlign: "center",
  },

  progressBar: {
    width: "100%",
    height: "10px",
    background: "#444",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "15px",
  },

  progressFill: {
    height: "100%",
    background: "linear-gradient(to right, #00ff87, #60efff)",
  },

  section: {
    marginTop: "10px",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "5px",
  },

  tagGreen: {
    background: "#00ff87",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  tagRed: {
    background: "#ff4d4d",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },

  suggestion: {
    marginTop: "15px",
    padding: "10px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "8px",
  },
};

export default App;
