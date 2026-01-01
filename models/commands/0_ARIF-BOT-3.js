const axios = require("axios");

module.exports.config = {
  name: "arman",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Gemini Flash 2.0 AI (No Prefix)",
  commandCategory: "ai",
  usages: "arman [question]",
  cooldowns: 3,
  usePrefix: false // 🔥 IMPORTANT
};

module.exports.run = async function ({ api, event }) {
  try {
    if (!event.body) return;

    const body = event.body.trim();
    if (!body.toLowerCase().startsWith("arman")) return;

    let question = body.slice(5).trim();

    if (!question) {
      question = "Ek pyari si shayari suna do";
    }

    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: question }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyBH15lctcz6iQFiCRV9uC8TEBtflY--ey0" // 🔑 REAL KEY
        }
      }
    );

    let reply = "❌ Gemini se reply nahi mila.";

    if (res.data?.candidates?.[0]?.content?.parts) {
      reply = res.data.candidates[0].content.parts
        .map(p => p.text)
        .join("\n");
    }

    return api.sendMessage(reply, event.threadID, event.messageID);

  } catch (err) {
    console.error("Gemini Error:", err.response?.data || err.message);
    return api.sendMessage(
      "❌ Arman abhi available nahi hai.",
      event.threadID,
      event.messageID
    );
  }
};