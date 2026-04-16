const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Sample skills list (AI logic)
const skillsList = [
  "javascript",
  "react",
  "node",
  "sql",
  "python",
  "machine learning",
  "api",
  "mongodb"
];

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text.toLowerCase();

    let matchedSkills = [];
    skillsList.forEach(skill => {
      if (text.includes(skill)) {
        matchedSkills.push(skill);
      }
    });

    const score = Math.round((matchedSkills.length / skillsList.length) * 100);

    const missingSkills = skillsList.filter(skill => !matchedSkills.includes(skill));

    fs.unlinkSync(filePath); // delete file after processing

    res.json({
      score,
      matchedSkills,
      missingSkills,
      suggestions: missingSkills.length
        ? `Add skills like: ${missingSkills.join(", ")}`
        : "Great resume!"
    });

  } catch (err) {
    res.status(500).json({ error: "Error processing resume" });
  }
});

app.get("/", (req, res) => {
  res.send("Resume Analyzer API running");
});

app.listen(5000, () => console.log("Server running on port 5000"));
