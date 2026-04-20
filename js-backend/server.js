const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// RULE ENGINE (flags logic)
function analyzeMessage(msg) {
  msg = msg.toLowerCase();

  let score = 0;

  const rules = [
    { k: "hurt", w: 3 },
    { k: "kill", w: 5 },
    { k: "worthless", w: 2 },
    { k: "hate myself", w: 4 },
    { k: "stress", w: 1 },
    { k: "panic", w: 2 }
  ];

  rules.forEach(r => {
    if (msg.includes(r.k)) score += r.w;
  });

  if (score >= 5) return "danger";
  if (score >= 3) return "concern";
  return "normal";
}

// API: ShineBot analysis
app.post("/analyze", (req, res) => {
  const message = req.body.message || "";
  const level = analyzeMessage(message);

  res.json({
    level,
    time: new Date().toISOString()
  });
});

// run server
app.listen(3000, () => {
  console.log("LifeDash backend running on http://localhost:3000");
});
