const axios = require("axios");

module.exports.config = {
  name: "arman",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Google Gemini Flash 2.0 AI (No Prefix)",
  commandCategory: "ai",
  usages: "flash [question]",
  cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    const body = event.body ? event.body.trim() : "";
    if (!body) return;

  
    if (body.toLowerCase().startsWith("arman")) {
      let question = body.slice(5).trim(); // "arman" ke baad ka text
      if (!question || question.length === 0) {
        // agar sirf "baby" likha ho
        question = "joke ya shayari sunao ya mujhe se bat bhi kar sakte ho";
      }

      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [{ parts: [{ text: question }] }]
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": "AIzaSyDoYuV__4xooIqaZg21rmgWIjcxDV15ado"
          }
        }
      );

      let answer = "❌ Flash se koi reply nahi mila.";
      if (response.data?.candidates?.[0]?.content?.parts) {
        answer = response.data.candidates[0].content.parts
          .map(p => p.text || "")
          .join("\n");
      }

      return api.sendMessage(
        `${answer}`,
        event.threadID,
        event.messageID
      );
    }
  } catch (error) {
    console.error("Flash error:", error.response?.data || error.message);
    api.sendMessage("❌ Flash error!", event.threadID, event.messageID);
  }
};

// normal run ko empty rakho, taaki prefix wale se na chale
module.exports.run = () => {};