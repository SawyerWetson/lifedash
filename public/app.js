function tab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

/* ---------------- MOOD ---------------- */
function mood(m) {
  const map = {
    happy: "yaay! 😄",
    meh: "got it 🙂",
    sad: "ooh no :(",
    angry: "take a breath 🫶"
  };

  document.getElementById("moodText").textContent = map[m];
}

/* ---------------- CHAT ---------------- */
function addMsg(text, type) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.className = "msg " + type;
  div.textContent = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const input = document.getElementById("msg");
  const text = input.value;
  if (!text) return;

  addMsg(text, "user");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  addMsg(data.reply, "bot");

  if (data.flagged) {
    console.log("⚠ FLAG DETECTED");
  }

  input.value = "";
}
