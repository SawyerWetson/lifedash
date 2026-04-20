const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

/* ---------------- AI PERSONALITY ---------------- */
function generateResponse(msg) {
  const m = msg.toLowerCase();

  if (m.includes("sad")) {
    return "That sounds heavy. Do you want to talk about what’s behind it?";
  }

  if (m.includes("angry")) {
    return "That’s a strong feeling. What triggered it?";
  }

  if (m.includes("stress")) {
    return "Sounds like your mind is overloaded. Want to sort it out together?";
  }

  return "I’m listening — tell me more.";
}

/* ---------------- SAFETY FLAGS ---------------- */
function detectRisk(msg) {
  const t = msg.toLowerCase();

  const dangerPhrases = [
    "kill myself",
    "end my life",
    "hurt myself"
  ];

  return dangerPhrases.some(p => t.includes(p));
}

/* ---------------- CHAT API ---------------- */
app.post("/api/chat", (req, res) => {
  const msg = req.body.message || "";

  const flagged = detectRisk(msg);
  const reply = generateResponse(msg);

  res.json({
    reply,
    flagged
  });
});

app.listen(3000, () => {
  console.log("LifeDash running on http://localhost:3000");
});
