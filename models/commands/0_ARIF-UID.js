module.exports.config = {
  name: "uid",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Get User ID (self / mention / reply)",
  commandCategory: "Tools",
  cooldowns: 5
};

// 🔒 CREATOR NAME LOCK
function checkCredits(api, event) {
  if (module.exports.config.credits !== "ARIF BABU") {
    api.sendMessage(
      "❌ This command is locked.\nCreator: ARIF BABU",
      event.threadID,
      event.messageID
    );
    return false;
  }
  return true;
}

module.exports.run = function ({ api, event }) {

  // 🔐 CREDIT CHECK
  if (!checkCredits(api, event)) return;

  // ============ 1️⃣ REPLY ============
  if (event.messageReply && event.messageReply.senderID) {
    return api.sendMessage(
      `📌 𝗬𝗢𝗨𝗥 𝗨𝗜𝗗:\n${event.messageReply.senderID} ❤️`,
      event.threadID,
      event.messageID
    );
  }

  // ============ 2️⃣ MENTION ============
  const mentions = Object.keys(event.mentions);
  if (mentions.length > 0) {
    let msg = "";
    for (let i = 0; i < mentions.length; i++) {
      const name = event.mentions[mentions[i]].replace("@", "");
      msg += `📌 ${name} 𝗨𝗦𝗘𝗥 𝗨𝗜𝗗:\n${mentions[i]} ❤️\n\n`;
    }
    return api.sendMessage(msg.trim(), event.threadID, event.messageID);
  }

  // ============ 3️⃣ SELF UID ============
  return api.sendMessage(
    `📌 𝗨𝗦𝗘𝗥 𝗨𝗜𝗗:\n${event.senderID} ❤️`,
    event.threadID,
    event.messageID
  );
};