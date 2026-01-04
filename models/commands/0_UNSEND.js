module.exports.config = {
  name: "uns",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Detect message unsend (prefix + no prefix)",
  usePrefix: false,
  commandCategory: "group",
  cooldowns: 0
};

// ===== UNSEND DETECTION =====
module.exports.handleEvent = async function ({ api, event }) {
  if (event.type !== "message_unsend") return;

  try {
    const threadID = event.threadID;
    const senderID = event.senderID;

    // user info
    const userInfo = await api.getUserInfo(senderID);
    const name = userInfo[senderID]?.name || "Unknown User";

    api.sendMessage(
      `🗑️ MESSAGE UNSEND DETECTED\n\n👤 Name: ${name}\n🆔 UID: ${senderID}\n\n⚠️ Message delete kar diya gaya.`,
      threadID
    );
  } catch (e) {
    console.log("Unsend Error:", e);
  }
};

// ===== PREFIX COMMAND (OPTIONAL) =====
module.exports.run = async function ({ api, event }) {
  api.sendMessage(
    "✅ Unsend system already active.\n\n🔍 Prefix / no-prefix dono mein kaam karta hai.\n🔒 By ARIF BABU",
    event.threadID
  );
};